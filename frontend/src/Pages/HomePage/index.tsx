import { useContext } from "react";
import { UserContext } from "../../hooks/userContext";
import { User } from "../../interfaces/userInterface";
import './homepage.css'
import { Menu } from "../../components/menu";

export const HomePage = () => {
  const user: User = useContext(UserContext).state.user;
  console.log({user})
  return (
    <>
      <div>HOMEPAGE</div>
      <Menu />
    </>
  )
}