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

// Name
// Username
// password
// 1 foto de ti.
// 1 foto de tu comida favorita.
// 1 cancion favorita
// 1 libro favorito
// 1 sitio favorito
// 1 destino soñado
// 1 bucket lists of goals, dreams, and aspirations.

// Personality Quizzes: Incorporate fun and insightful personality quizzes that users can take to reveal more about themselves. These quizzes can cover various topics such as hobbies, interests, values, and preferences. The results can be displayed on their profiles, giving others a better understanding of who they are beyond the basics.

// CUANDO HAY MATCH-> RANDOM PROMPT that users can participate in 