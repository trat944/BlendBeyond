import { Request, Response } from "express";
import prisma from "../db/client";


export const getConversations = async (req: Request, res: Response) => {
  try {
    const { id: senderId } = req.params;
    console.log(senderId)

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            participant1Id: senderId,
          },
          {
            participant2Id: senderId,
          }
        ]
      },
      include: {
        messages: true,
      }
    });

    if (!conversations) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error getting messages', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  try {
    const { id: conversationId } = req.params;

    const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const deleteMessages = await prisma.message.deleteMany({
      where: {
        conversationId: conversationId
      }
    });
    
    const deletedConversation = await prisma.conversation.delete(({
      where: { id: conversation.id },
    }))

    res.status(200).json(conversation);
  } catch (error) {
    console.error('Error getting messages', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};