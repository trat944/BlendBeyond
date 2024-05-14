import { useForm } from 'react-hook-form'
import { User } from '../../../interfaces/userInterface'
import './profileSumUp.css'
import { UserService } from '../../../services/UserService'
import { useEffect, useState } from 'react'
import { getAge } from '../../../utils/getAge'
import { handleGetLocation } from '../../../utils/getLocation'
import { cityValidator } from '../../../utils/cityValidation'
import { RegisterOptions } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

type Props = {
  user: User | null
}

interface Location {
  latitude: number | null;
  longitude: number | null;
}

export const ProfileSumUp = ({user}: Props) => {
  const [userAge, setUserAge] = useState<number>()
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [nearestCity, setNearestCity] = useState<string>('');
  const {register, handleSubmit, formState: {errors}, reset} = useForm();
  
  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      const userAge = getAge(data.birthdate)
      if (userAge) {
        setUserAge(userAge)
      }
      data.birthdate = data.birthdate + 'T00:00:00.000Z'
      const updatedUser = { ...user, ...data, age: userAge }; 
      console.log({data})
      const response = await UserService.updateUser(updatedUser);
      console.log({response})
      if (response) {
        reset()
        window.localStorage.setItem('userLogged', JSON.stringify(response))
      }
    }})

    useEffect(() => {
      const inputElement = document.getElementById('city') as HTMLInputElement;
      if (inputElement) {
        inputElement.value = '';
        inputElement.value = nearestCity
      }
    }, [nearestCity]);
    

  return (
    <div className="userProfile_container">
      <form action="" onSubmit={onSubmit}>
        <div className="profilePicContainer">
          <label htmlFor="fileInput" className="profilePicContainer">
            <FontAwesomeIcon className='change-pic' icon={faPen} />
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
        <span className='user-name-age'>{user?.name}, {user?.age}</span>
        <div className="input-container">
          <input 
          type="date"
          {...register('birthdate', {
            required: {
              value: true,
              message: "Birthdate is required"
            }
          })} />
          <div className="pair-of-inputs-container">
            <input
            id='city'
            type="text"
            placeholder="Ciudad"
            {...register('city', {
              required: {
                value: true,
                message: "City is required",
                // validate: (value) => cityValidator(value) || "Invalid city"
              }
            })} />
            <button 
            className='localization-btn'
            onClick={() => handleGetLocation(setLocation, setNearestCity)}>
            Get Location</button>
          </div>
          <div className="pair-of-inputs-container">
            <label htmlFor="sex">How do you identify yourself?</label>
            <select id="sex"
            {...register('sex', {
              required: {
                value: true,
                message: "Sex is required",
              }
            })}>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value="non-binary">Non-binary</option>
              <option value="transgender">Transgender</option>
            </select>
          </div>
          <div className="pair-of-inputs-container">
            <label htmlFor="lookingFor">What are you looking for?</label>
            <select id="lookingFor"
            {...register('lookingFor', {
              required: {
                value: true,
                message: "Your preference is required",
              }
            })}>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </select>
          </div>
        </div>
        <button>submit</button>
      </form>
      <div>
    </div>
    
    </div>
  )
}