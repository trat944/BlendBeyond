import { User } from "../../interfaces/userInterface";
import './homepage.css'
import { PersonCard } from "../../components/personCard";
import { useContext } from "react";
import { UserContext } from "../../hooks/userContext";
import { Layout } from "../../components/layout";


export const HomePage = () => {
  const user: User | null = useContext(UserContext).state.user
  console.log({user})
  return (
    <Layout>
      <PersonCard user={user} />
    </Layout>
  )
}