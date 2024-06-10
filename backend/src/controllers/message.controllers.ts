import { Request, Response } from "express";
import prisma from "../db/client";
import { getReceiverSocketId, io } from "../server";


export const getMessages = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.body;
    const { id: senderId } = req.params;

    const conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            participant1Id: senderId,
            participant2Id: receiverId,
          },
          {
            participant1Id: receiverId,
            participant2Id: senderId,
          }
        ]
      },
      include: {
        messages: true,
      }
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error('Error getting messages', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message, receiverId } = req.body;
    const { id: senderId } = req.params;

    // Encuentra la conversación existente entre los dos usuarios
    const conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          { participant1Id: senderId, participant2Id: receiverId },
          { participant1Id: receiverId, participant2Id: senderId }
        ]
      },
      include: {
        messages: true,
      }
    });

    let conversationId: string;

    if (conversation) {
      // Si la conversación ya existe, usa su ID
      conversationId = conversation.id;
    } else {
      // Si la conversación no existe, créala
      const conversation = await prisma.conversation.create({
        data: {
          participant1: { connect: { id: senderId } },
          participant2: { connect: { id: receiverId } }
        }
      });
      conversationId = conversation.id;
    }

    // Crea el nuevo mensaje en la conversación
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        message,
        conversationId,
      }
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { messageId } = req.body;

  if (!messageId) {
    return res.status(400).send("Invalid id parameter");
  }

  try {
    await prisma.message.delete({
      where: { id: messageId },
    });

    res.status(200).send("Message deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to delete message");
  }
};
