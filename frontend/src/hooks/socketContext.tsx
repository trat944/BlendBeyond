import { createContext, useState, useEffect, useContext, PropsWithChildren, FC } from "react";
import { io, Socket } from "socket.io-client";
import { UserContext } from "./userContext";

// Define types
interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: any[];
  isFetchingUsers: boolean;
}

// Create context with proper types
const SocketContext = createContext<SocketContextProps>({
  socket: null,
  onlineUsers: [],
  isFetchingUsers: false, // Initial state for fetching status
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false); // New state for fetching

  const { user } = useContext(UserContext).state;

  useEffect(() => {
    if (user) {
      setIsFetchingUsers(true); // Set fetching to true initially

      const socket = io("http://localhost:4000", {
        query: { userId: user.id },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
        setIsFetchingUsers(false); // Set fetching to false after receiving data
      });

      return () => {
        socket.disconnect();
        setSocket(null);
      };
    } else {
      setIsFetchingUsers(false); // Reset fetching state if user is not logged in
    }
  }, [user]); // Update useEffect dependency to include user

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, isFetchingUsers }}>
      {children}
    </SocketContext.Provider>
  );
};