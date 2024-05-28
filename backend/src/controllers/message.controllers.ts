import { Request, Response } from "express";
import prisma from "../db/client";


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

    // const updatedConversation = await prisma.conversation.findUnique({
    //   where: { id: conversationId },
    //   include: { messages: true },
    // });

    // if (newMessage) {
    //   conversation?.messages.push(newMessage)
    // }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};