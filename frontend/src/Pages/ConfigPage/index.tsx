import { Layout } from '../../components/layout';
import { User } from '../../interfaces/userInterface';
import './configPage.css'
import { ProfileSumUp } from "./ProfileSumUp";

export const ConfigPage = () => {
  const user: User | null = JSON.parse(localStorage.getItem('userLogged') || 'null');
  return (
    <Layout>
      <ProfileSumUp user={user} />
    </Layout>
  )
}