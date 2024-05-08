import { useForm } from 'react-hook-form'
import { User } from '../../../interfaces/userInterface'
import './profileSumUp.css'
import { UserService } from '../../../services/UserService'
import { useState } from 'react'
import { getAge } from '../../../utils/getAge'

type Props = {
  user: User | null
}

export const ProfileSumUp = ({user}: Props) => {
  const [userAge, setUserAge] = useState<number>()

  const {register, handleSubmit, formState: {errors}, reset} = useForm();
  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      const age = getAge(data.birthdate)
      console.log({age})
      if (age) setUserAge(age)
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
      <form action="" onSubmit={onSubmit}>
        <div className="profilePicContainer">
        <label htmlFor="fileInput" className="profilePicContainer">
          <img className='profilePic' src={user?.pictureUrl} alt="" />
          <input 
            className='img-input'
            id="fileInput"
            type='file'
            {...register('selfImage', {
              required: {
                value: true,
                message: "selfImage is required"
              }
            })}
          />
        </label>
        </div>
        <span className='user-name-age'>{user?.name}, {userAge}</span>
        <div className="input-container">
          <input 
          type="date"
          {...register('birthdate', {
            required: {
              value: true,
              message: "Birthdate is required"
            }
          })} />
        </div>
        <button>submit</button>
      </form>
    </div>
  )
}