import { useForm } from 'react-hook-form';
import { InputField } from '../../../../styled_components/inputField'
import './loginForm.css'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { UserContext } from '../../../../hooks/userContext';
import { Modal } from '../../../../components/Modal';
import { ModalSetting } from '../../../../styled_components/modalSetting';
import { UserService } from '../../../../services/UserService';
import { User } from '../../../../interfaces/userInterface';

export const LoginForm = () => {

  const {register, handleSubmit, formState: {errors}, reset} = useForm();
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [noMatchedUserError, setNoMatchedUserError] = useState(false);
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [resetMessage, setresetMessage] = useState(false)

  const onChangeResetPassWordModal = () => {
    setResetPasswordModal(true);
    setresetMessage(false)
  }

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      const loggedUser: User = await UserService.loginUser(data);
      if (loggedUser) {
        const profileProperties = 20
        reset()
        if (Object.keys(loggedUser).length === profileProperties) navigate('/homepage')
        if (Object.keys(loggedUser).length !== profileProperties) navigate('/configpage')
        dispatch({ type: "LOGIN", payload: loggedUser })
      } else {
        setNoMatchedUserError(true)
      }
    }})

    const onSubmitForRecovery = handleSubmit(async () => {
      if (Object.keys(errors).length === 0) {
        reset()
        setresetMessage(true)
        setNoMatchedUserError(false)
        setResetPasswordModal(false)
      }}
    )
  
  return (
    <form className='form-container' onSubmit={onSubmit}>
        <InputField 
          placeholder="email"
          {...register('email', {
            required: {
              value: true,
              message: "Email is required"
            },  pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address"
            } 
          })}
        ></InputField>

        {errors.email && typeof errors.email.message === 'string' && <span className='error-msg'>{errors.email.message}</span>}

        <InputField 
          type='password'
          placeholder="Password"
          {...register('password', {
            required: {
              value: true,
              message: "Password is required"
            }, minLength: {
              value: 2,
              message: "Password has to be at least 2 characters"
            }
          })}
        ></InputField>

        {errors.password && typeof errors.password.message === 'string' && <span className='error-msg'>{errors.password.message}</span>}

      {noMatchedUserError && (
        <>
          <span>No user matched</span>
          <span onClick={onChangeResetPassWordModal} className='password-reset'>Forget your password?</span>

          {resetPasswordModal && (
            <ModalSetting>
              <Modal onOpen={setResetPasswordModal}>
                <div onClick={onSubmitForRecovery} className="reset-password-container">
                  <InputField 
                    type='email'
                    placeholder="name@hotmail.com"
                    {...register('emailForRecovery', {
                      required: {
                        value: true,
                        message: "Email is required"
                      },  pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address"
                      } 
                    })}
                  ></InputField>
                  {errors.emailForRecovery && typeof errors.emailForRecovery.message === 'string' && <span className='error-msg'>{errors.emailForRecovery.message}</span>}
                  
                  {resetMessage && <span>An email has been sent to reset the password.</span>}

                  <button className='signBtn' type='submit'>Send</button>
                </div>
              </Modal>
            </ModalSetting>
          )}
        </>
      )}
      <button className='signBtn' type='submit'>Sign In</button>
    </form>
  )
}
