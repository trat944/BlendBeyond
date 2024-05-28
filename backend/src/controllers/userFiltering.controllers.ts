import { Request, Response } from "express";
import prisma from "../db/client";
import cloudinary, { deleteImage, uploadCoverImg } from "../utils/cloudinaryConfig";
import { error } from "console";
import fs from 'fs-extra'
import bcrypt from 'bcrypt';
import { User } from "@prisma/client";

export const getDesiredUsers = async (req: Request, res: Response) => {
  const { city, lookingFor, sex, likedUsers, dislikedUsers } = req.body;

  if (!city || !lookingFor || !sex || !likedUsers || !dislikedUsers) {
    return res.status(400).send("Missing required parameters");
  }

  const likedUserIds = likedUsers.map((like: any) => like.toId);
  const dislikedUserIds = dislikedUsers.map((dislike: any) => dislike.toId);

  try {
    const desiredUsers = await prisma.user.findMany({
      where: {
        city,
        sex: lookingFor,
        lookingFor: sex,
        id: {
          notIn: [...likedUserIds, ...dislikedUserIds], 
        },
      },
    });
    res.status(200).send(desiredUsers);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getMatchedUsersWithoutConversationOpen = async (req: Request, res: Response) => {
  const { id, likedUsers, likedBy } = req.body;

  try {
    if (!likedUsers || !likedBy) {
      return res.status(400).send("Missing people you liked or people that like you");
    }
  
    const likedUserIds = likedUsers.map((like: any) => like.toId);
    const usersThatLikeUser: string[] = likedBy.map((like: any) => like.fromId);
    const matchedUsers: string[] = [];
  
    usersThatLikeUser.forEach((userId: string) => {
      if (likedUserIds.includes(userId)) {
        matchedUsers.push(userId);
      }
    });

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { participant1Id: id },
          { participant2Id: id },
        ],
      },
      select: {
        participant1Id: true,
        participant2Id: true,
      },
    });

    const participantsInConversations = new Set<string>();
    conversations.forEach((conversation) => {
      participantsInConversations.add(conversation.participant1Id);
      participantsInConversations.add(conversation.participant2Id);
    });

    const filteredMatchedUsers = matchedUsers.filter(userId => !participantsInConversations.has(userId));

    const matchedFound = await prisma.user.findMany({
      where: {
        id: {
          in: filteredMatchedUsers,
        },
      },
    });

    res.status(200).send(matchedFound);
  } catch (error) {
    console.error('Error getting matched users', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getUsersWithConversations = async (req: Request, res: Response) => {
  try {
    const { id: senderId } = req.params;

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { participant1Id: senderId },
          { participant2Id: senderId },
        ]
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      }
    });

    if (!conversations || conversations.length === 0) {
      return res.status(404).json({ error: 'No conversations found' });
    }

    const usersWithLastMessage = await Promise.all(conversations.map(async (conversation) => {
      const participantId = conversation.participant1Id === senderId ? conversation.participant2Id : conversation.participant1Id;
      const user = await prisma.user.findUnique({
        where: { id: participantId },
        select: {
          id: true,
          name: true,
          age: true,
          pictureUrl: true
        }
      });
      return {
        user,
        lastMessage: conversation.messages[0] 
      };
    }));

    res.status(200).json(usersWithLastMessage);
  } catch (error) {
    console.error('Error getting users with conversations', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};