import { useContext } from "react";
import { UserContext } from "../../hooks/userContext";

export const HomePage = () => {
  const user = useContext(UserContext);
  console.log({user})
  return (
    <div>index</div>
  )
}