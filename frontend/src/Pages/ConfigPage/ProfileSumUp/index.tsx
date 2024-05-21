import { useForm } from 'react-hook-form'
import { User } from '../../../interfaces/userInterface'
import './profileSumUp.css'
import { UserService } from '../../../services/UserService'
import { useEffect, useState } from 'react'
import { getAge } from '../../../utils/getAge'
import { handleGetLocation } from '../../../utils/getLocation'
import { cityValidator } from '../../../utils/cityValidation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { SecondaryButton } from '../../../styled_components/logoutButton'

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
  const {register, handleSubmit, formState: {errors}} = useForm();
  
  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      const age = getAge(data.birthdate)
      if (age) setUserAge(age)
      data.birthdate = data.birthdate + 'T00:00:00.000Z'
      const updatedUser = { ...user, ...data}; 
      const response = await UserService.updateUser(updatedUser);
      if (response) {
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

    useEffect(() => {
      const age = getAge(user?.birthdate)
      setUserAge(age)
    }, [])

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
                  message: "Avatar is required"
                }
              })}
            />
          </label>
        </div>
        {errors.selfImage && typeof errors.selfImage.message === 'string' && <span className='error-msg'>{errors.selfImage.message}</span>}
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
          {errors.birthdate && typeof errors.birthdate.message === 'string' && <span className='error-msg'>{errors.birthdate.message}</span>}
          <div className="pair-of-inputs-container">
            <input
            id='city'
            type="text"
            placeholder="Ciudad"
            defaultValue={user?.city || ''}
            {...register('city', {
              validate: (value) =>
                cityValidator(value) || "Invalid city"
            })}/>
            {errors.city && typeof errors.city.message === 'string' && <span className='error-msg'>{errors.city.message}</span>}
            <SecondaryButton 
            className='localization-btn'
            onClick={(event) => handleGetLocation(event, setLocation, setNearestCity)}>
            Get Location</SecondaryButton>
          </div>
          <div className="pair-of-inputs-container">
            <label htmlFor="sex">How do you identify yourself?</label>
            <select id="sex"
            {...register('sex', {
              value: user?.sex !== null ? user?.sex : 'select',
              validate: (value) =>
                value !== 'select' ? true : 'Your sex is required',
            })}>
              <option value="select">Select</option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value="non-binary">Non-binary</option>
              <option value="transgender">Transgender</option>
            </select>
            {errors.sex && typeof errors.sex.message === 'string' && <span className='error-msg'>{errors.sex.message}</span>}
          </div>
          <div className="pair-of-inputs-container">
            <label htmlFor="lookingFor">What are you looking for?</label>
            <select id="lookingFor"
            {...register('lookingFor', {
              value: user?.lookingFor !== null ? user?.lookingFor : 'select',
              validate: (value) =>
                value !== 'select' ? true : 'Your preference is required',
            })}>
              <option value="select">Select</option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </select>
          </div>
          {errors.lookingFor && typeof errors.lookingFor.message === 'string' && <span className='error-msg'>{errors.lookingFor.message}</span>}
        </div>
        <button>submit</button>
      </form>
      <div>
    </div>
    
    </div>
  )
}