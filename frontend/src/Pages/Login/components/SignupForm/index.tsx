import { useForm } from 'react-hook-form';
import { InputField } from '../../../../styled_components/inputField';
import './signupForm.css'
import { UserService } from '../../../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../hooks/userContext';
import { useContext } from 'react';

export const SignupForm = () => {
  const {register, handleSubmit, formState: {errors}, reset, getValues} = useForm();
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      delete data.repeatPassword
      const response = await UserService.createUser(data);
      if (response) {
        reset()
        navigate('/configpage')
        dispatch({ type: "LOGIN", payload: response })
        window.localStorage.setItem('userLogged', JSON.stringify(response))
      }
    }})
  
  return (
    <form className='form-container' onSubmit={onSubmit}>
        <InputField 
          placeholder="Name"
          {...register('name', {
            required: {
              value: true,
              message: "Name is required"
            }, minLength: {
              value: 2,
              message: "Name has to be at least 2 characters"
            }
          })}
        ></InputField>

        {errors.username && typeof errors.username.message === 'string' && <span className='error-msg'>{errors.username.message}</span>}

        <InputField 
          type='email'
          placeholder="name@hotmail.com"
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
              value: 8,
              message: "Password has to be at least 8 characters"
            }, validate: {
              hasSpecialChar: value => /^(?=.*[!@#$%^&*()-_+=])/.test(value) || "Password must contain at least one special character",
              hasUpperCase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter"
            }
          })}
        ></InputField>

        {errors.password && typeof errors.password.message === 'string' && <span className='error-msg'>{errors.password.message}</span>}

        <InputField 
          type='password'
          placeholder="Repeat password"
          {...register('repeatPassword', {
            required: {
              value: true,
              message: "This field is required"
            }, minLength: {
              value: 8,
              message: "Password has to be at least 8 characters"
            }, validate: {
              matchesPassword: value => value === getValues('password') || "Passwords must match"
            }
          })}
        ></InputField>

        {errors.repeatPassword && typeof errors.repeatPassword.message === 'string' && <span className='error-msg'>{errors.repeatPassword.message}</span>}
      <button className='signBtn' type='submit'>Sign Up</button>
    </form>
  )
}
