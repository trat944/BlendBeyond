import { Request, Response } from "express";
import prisma from "../db/client";

export const getConversation = async (req: Request, res: Response) => {
  try {
    const { participant2 } = req.body;
    const { id: participant1 } = req.params;

    const conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            participant1Id: participant1,
            participant2Id: participant2,
          },
          {
            participant1Id: participant2,
            participant2Id: participant1,
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

    res.status(200).json(conversation);
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