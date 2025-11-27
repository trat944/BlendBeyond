import { Layout } from '../../components/layout';
import { User } from '../../interfaces/userInterface';
import './configPage.css'
import { DeleteButton } from './DeleteButton';
import { LogoutButton } from './LogoutButton';
import { ProfileSumUp } from "./InitialForm";

export const ConfigPage = () => {
  const user: User | null = JSON.parse(localStorage.getItem('userLogged') || 'null');
  return (
    <Layout>
      <div className='config_page_container'>
        <ProfileSumUp user={user} />
        <div className="button-container">
          <LogoutButton user={user} />
          <DeleteButton user={user} />
        </div>
      </div>
    </Layout>
  )
}