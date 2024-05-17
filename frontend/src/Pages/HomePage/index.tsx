import { User } from "../../interfaces/userInterface";
import './homepage.css'
import { PersonCard } from "./personCard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/userContext";
import { Layout } from "../../components/layout";
import { UserService } from "../../services/UserService";
import { LikeDislikeButtons } from "./like-dislike-buttons";
import { NoUsers } from "./no-users";


export const HomePage = () => {
  const user: User | null = useContext(UserContext).state.user
  const [users, setUsers] = useState<User[]>([])
  const [currentIndex, setCurrentIndex] = useState(0); 

  useEffect(() => {
    const fetchUsers = async () => {
      if (user) {
        try {
          console.log({user})
          const fetchedUsers: User[] = await UserService.getDesiredUsers(user);
          console.log({fetchedUsers})
          setUsers(fetchedUsers);
        } catch (error) {
          console.error('Error fetching desired users:', error);
        }
      }
    };
    fetchUsers();
  }, [user?.likedUsers]);

  const handleNextCardWhenLiked = () => {
    setCurrentIndex((prevIndex) => prevIndex);
  };

  const handleNextCardWhenDisliked = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <Layout>
      {users && users.length > 0 && currentIndex < users.length ? (
        <>
        <PersonCard 
          key={users[currentIndex].id} 
          user={users[currentIndex]}  
        />
        <LikeDislikeButtons 
          user={users[currentIndex]} 
          onHandleCardWhenLiked={handleNextCardWhenLiked} 
          onHandleCardWhenDisliked={handleNextCardWhenDisliked}
        />
        </>
      ): (
        <NoUsers user={user} />
      )}

    </Layout>
  )
}