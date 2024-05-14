import { Menu } from '../../components/menu';
import { User } from '../../interfaces/userInterface';
import './configPage.css'
import { ProfileSumUp } from "./ProfileSumUp";

export const ConfigPage = () => {
  const user: User | null = JSON.parse(localStorage.getItem('userLogged') || 'null');
  return (
    <>
    <ProfileSumUp user={user} />
    <Menu />
    </>
  )
}