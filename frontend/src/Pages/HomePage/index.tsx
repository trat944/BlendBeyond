import { User } from "../../interfaces/userInterface";
import './homepage.css'
import { PersonCard } from "./personCard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/userContext";
import { Layout } from "../../components/layout";
import { LikeDislikeButtons } from "../../components/like-dislike-buttons";
import { NoUsers } from "./no-users";
import { getDesiredUsers } from "../../utils/petitionsToBackend";


export const HomePage = () => {
  const user: User | null = useContext(UserContext).state.user
  const [users, setUsers] = useState<User[]>([])
  const [currentIndex, setCurrentIndex] = useState(0); 
  console.log({user})

  useEffect(() => {
    getDesiredUsers(user, setUsers);
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