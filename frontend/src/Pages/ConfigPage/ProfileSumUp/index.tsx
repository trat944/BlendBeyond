import { useForm } from 'react-hook-form'
import { User } from '../../../interfaces/userInterface'
import './profileSumUp.css'
import { UserService } from '../../../services/UserService'
import { useState } from 'react'
import { InputField } from '../../../styled_components/inputField'
import { getAge } from '../../../utils/getAge'
import { handleGetLocation } from '../../../utils/getLocation'
import { citiesInSpain } from '../../../utils/citiesInSpain'

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
      const age = getAge(data.birthdate)
      if (age) setUserAge(age)
      data.birthdate = data.birthdate + 'T00:00:00.000Z'
      const updatedUser = { ...user, ...data }; 
      console.log({updatedUser})
      const response = await UserService.updateUser(updatedUser);
      console.log({response})
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
          <InputField 
          type="date"
          {...register('birthdate', {
            required: {
              value: true,
              message: "Birthdate is required"
            }
          })} />
          <label htmlFor="city">Busca tu ciudad:</label>
          <InputField
            type="text"
            placeholder="Escribe el nombre de tu ciudad"
            {...register('city', {
              required: {
                value: true,
                message: "City is required"
              }
            })} />
          </div>
        <button>submit</button>
      </form>
      <div>
      <button onClick={() => handleGetLocation(setLocation, setNearestCity)}>Obtener ubicación GPS</button>
      {nearestCity && <p>Ciudad más cercana: {nearestCity}</p>}
    </div>
    
    </div>
  )
}