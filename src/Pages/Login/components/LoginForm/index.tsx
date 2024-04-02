import { useForm } from 'react-hook-form';
import { InputField } from '../../../../styled_components/inputField'
import './signUpForm.css'
import { User, fetchUsers } from '../../../../utils/fetchUsers';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../../../../hooks/userContext';

export const LoginForm = () => {

  const {register, handleSubmit, formState: {errors}, reset} = useForm();
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      reset();
      const users: User[] = await fetchUsers();
      if (users) console.log(users)
        const loggedUser = users.find(userFetched => (
          userFetched.username.trim().toLowerCase() === data.username.trim().toLowerCase() && userFetched.password
          === data.password
      ))
      console.log(users)
      if (loggedUser) {
        navigate('/homepage')
        dispatch({ type: "LOGIN", payload: loggedUser });
      } 
    }})
  
  return (
    <form className='form-container' onSubmit={onSubmit}>
      <div className="form-container">
        <InputField 
          placeholder="Username"
          {...register('username', {
            required: {
              value: true,
              message: "Username is required"
            }, minLength: {
              value: 2,
              message: "Username has to be at least 2 characters"
            }
          })}
        ></InputField>

        {errors.username && typeof errors.username.message === 'string' && <span className='error-msg'>{errors.username.message}</span>}

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
      </div>
      <button className='signBtn' type='submit'>Sign In</button>
    </form>
  )
}
