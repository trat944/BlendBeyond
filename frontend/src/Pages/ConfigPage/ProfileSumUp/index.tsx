import { useForm } from 'react-hook-form'
import { User } from '../../../interfaces/userInterface'
import './profileSumUp.css'
import { UserService } from '../../../services/UserService'

type Props = {
  user: User | null
}

export const ProfileSumUp = ({user}: Props) => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm();
  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      console.log({data})
      data.birthdate = data.birthdate + 'T00:00:00.000Z'
      const updatedUser = { ...user, ...data }; 
      console.log({updatedUser})
      const response = await UserService.updateUser(updatedUser);
      if (response) {
        reset()
        window.localStorage.setItem('userLogged', JSON.stringify(response))
      }
    }})
  return (
    <div className="userProfile_container">
      <img className='profilePic' src={user?.selfImage} alt="" />
      <span>{user?.name}</span>
      <form action="" onSubmit={onSubmit}>
        <input 
        type="date"
        {...register('birthdate', {
          required: {
            value: true,
            message: "Birthdate is required"
          }
        })} />
        <input type='file'
        {...register('selfImage', {
          required: {
            value: true,
            message: "selfImage is required"
          }
        })} />
        <button>submit</button>
      </form>
    </div>
  )
}