import { User } from "../../interfaces/userInterface";
import './homepage.css'
import { PersonCard } from "./personCard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/userContext";
import { Layout } from "../../components/layout";
import { LikeDislikeButtons } from "../../components/like-dislike-buttons";
import { NoUsers } from "./no-users";
import { getDesiredUsers } from "../../utils/petitionsToBackend";
import { NoProfileInfoMessage } from "./noProfileInfo";
import { Menu } from "../../components/menu";


export const HomePage = () => {
  const user: User | null = useContext(UserContext).state.user
  const [users, setUsers] = useState<User[]>([])
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [noProfileInfoMessage, setnoProfileInfoMessage] = useState(false)
  console.log({user})

  useEffect(() => {
    handleProfileInfoMessage();
  }, []);

  useEffect(() => {
    getDesiredUsers(user, setUsers);
  }, [user?.likedUsers]);

  const handleNextCardWhenLiked = () => {
    setCurrentIndex((prevIndex) => prevIndex);
  };

  const handleNextCardWhenDisliked = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleProfileInfoMessage = () => {
    if (!user?.age || !user?.city || !user?.birthdate || user?.sex === 'select' || user?.lookingFor === 'select') {
      setnoProfileInfoMessage(true);
    } else {
      setnoProfileInfoMessage(false);
    }
  };

  return (
    <>
      {noProfileInfoMessage ? (
        <>
          <NoProfileInfoMessage user={user} />
          <Menu />
        </>
      ) : (
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
          ) : (
            <NoUsers user={user} />
          )}
        </Layout>
      )}
    </>
  );
};