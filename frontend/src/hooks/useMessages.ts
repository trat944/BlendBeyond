import { useEffect, useRef, useState } from 'react';
import notificationSound from '../assets/notification.mp3'; 
import { MessageIndividual } from '../interfaces/conversation';
import { useSocketContext } from './socketContext';
import { getMessages } from '../utils/petitionsToBackend';

export const useMessages = (loggedUserId: string, userId: string) => {
  const { socket, onlineUsers } = useSocketContext();
  const [messages, setMessages] = useState<MessageIndividual[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const isOnline = onlineUsers.includes(userId);

  useEffect(() => {
    const handleMessage = (newMessage: MessageIndividual) => {
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    if (socket) {
      socket.on("newMessage", handleMessage);
    }

    return () => {
      if (socket) {
        socket.off("newMessage", handleMessage);
      }
    };
  }, [socket]);

  useEffect(() => {
    getMessages(loggedUserId, userId, setMessages);
  }, [messages, loggedUserId, userId]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return { messages, setMessages, lastMessageRef, isOnline };
};