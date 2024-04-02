import './login.css'
import { LoginButtons } from './components/LoginButtons'
import { useState } from 'react'
import { Modal } from './components/Modal'
import { LoginForm } from './components/LoginForm'
import { SignupForm } from './components/SignupForm'

export const LoginPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);
  const [signUpButtonClicked, setSignUpButtonClicked] = useState(false);
  
  return (
    <>
    <img className='logo' src='../src/assets/logo.webp' alt="logo" />
    <LoginButtons 
      onOpen = {setOpenModal}
      onLoginClicked = { setLoginButtonClicked }
      onSignUpClicked = { setSignUpButtonClicked }  />

    {openModal && <Modal onOpen={setOpenModal}>

        {loginButtonClicked && (
          <LoginForm />
        )}

        {signUpButtonClicked && (
          <SignupForm />
        )}

    </Modal>}
    </>
  )
}
