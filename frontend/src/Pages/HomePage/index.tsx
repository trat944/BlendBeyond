import { User } from "../../interfaces/userInterface";
import './homepage.css'
import { PersonCard } from "../../components/personCard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/userContext";
import { Layout } from "../../components/layout";
import { UserService } from "../../services/UserService";


export const HomePage = () => {
  const user: User | null = useContext(UserContext).state.user
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      if (user) {
        try {
          const fetchedUsers: User[] = await UserService.getDesiredUsers(user);
          setUsers(fetchedUsers);
        } catch (error) {
          console.error('Error fetching desired users:', error);
        }
      }
    };
    fetchUsers();
  }, []);

  return (
    <Layout>
      <PersonCard user={users[0]} />
    </Layout>
  )
}