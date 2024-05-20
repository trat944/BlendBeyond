import './loginButtons.css'
import { LogButton } from '../../../../styled_components/logButton'
import { openModal } from '../../../../utils/openModal';

type Props = {
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onLoginClicked: React.Dispatch<React.SetStateAction<boolean>>;
  onSignUpClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginButtons = ({onOpen, onLoginClicked, onSignUpClicked}: Props) => {
  return (
    <div className="login-container">
      <LogButton className='loginBtn' onClick={(event) => {openModal(onOpen, event, onLoginClicked, onSignUpClicked)}}>LOGIN</LogButton>
      <LogButton className='signUpBtn' onClick={(event) => {openModal(onOpen, event, onLoginClicked, onSignUpClicked)}}>SIGN UP</LogButton>
    </div>
  )
}