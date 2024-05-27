import { Request, Response } from "express";
import prisma from "../db/client";


export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message, receiverId } = req.body;
    const { id: senderId } = req.params;
    // const senderId = (req as any).user.id;

    // Encuentra la conversación existente entre los dos usuarios
    const conversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            userId: { in: [senderId, receiverId] }
          }
        }
      },
      include: {
        participants: true,
        messages: true,
      }
    });

    let conversationId: string;

    if (conversation) {
      // Si la conversación ya existe, usa su ID
      conversationId = conversation.id;
    } else {
      // Si la conversación no existe, créala
      const newConversation = await prisma.conversation.create({
        data: {
          participants: {
            create: [
              { user: { connect: { id: senderId } } },
              { user: { connect: { id: receiverId } } }
            ]
          }
        }
      });
      conversationId = newConversation.id;
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

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};