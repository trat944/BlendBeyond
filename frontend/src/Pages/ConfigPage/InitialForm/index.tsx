import { useForm } from 'react-hook-form'
import { User } from '../../../interfaces/userInterface'
import './initialForm.css'
import { UserService } from '../../../services/UserService'
import { useContext, useEffect, useState } from 'react'
import { getAge } from '../../../utils/getAge'
import { handleGetLocation } from '../../../utils/getLocation'
import { cityValidator } from '../../../utils/cityValidation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { SecondaryButton } from '../../../styled_components/logoutButton'
import { UserContext } from '../../../hooks/userContext'
import { getFormattedDate, getOriginalDate } from '../../../utils/getFormattedDate'

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
  const [formattedTime, setFormattedTime] = useState<string>('')
  const {register, handleSubmit} = useForm();
  const {dispatch} = useContext(UserContext)
  
  const onSubmit = handleSubmit(async (data) => {
    const age = getAge(data.birthdate);
    if (age !== undefined) setUserAge(age);
    if (formattedTime && !data.birthdate) {
      data.birthdate = formattedTime
      setUserAge(getAge(formattedTime))
    }
    data.birthdate = getOriginalDate(data.birthdate)
    const updatedUser = { ...user, ...data, age };
    const response = await UserService.updateUser(updatedUser);
    if (response) {
      window.localStorage.setItem('userLogged', JSON.stringify(response));
      dispatch({ type: 'LOGIN', payload: response });
    }
  });

  useEffect(() => {
    if (user?.birthdate) {
      const formattedDate = getFormattedDate(user?.birthdate)
      setFormattedTime(formattedDate)
    }
    if (user?.birthdate) {
      const age = getAge(user?.birthdate);
      setUserAge(age);
    }
    if (user?.city) {
      setNearestCity(user?.city)
    }
  }, [user]);

  return (
    <div className="userProfile_container">
      <form onSubmit={onSubmit}>
        <div className="profilePicContainer">
          <label htmlFor="fileInput" className="profilePicContainer">
            <FontAwesomeIcon className='change-pic' icon={faPen} />
            <img className='profilePic' src={user?.pictureUrl} alt="" />
            <input
              className='img-input'
              id="fileInput"
              type='file'
              {...register('selfImage')}
            />
          </label>
        </div>
        <span className='user-name-age'>{user?.name}, {userAge}</span>
        <div className="input-container">
          <input
            type="date"
            defaultValue={formattedTime}
            {...register('birthdate')}
          />
          <div className="pair-of-inputs-container">
            <input
              id='city'
              type="text"
              placeholder="Ciudad"
              defaultValue={nearestCity}
              {...register('city', {
                validate: (value) =>
                  cityValidator(value) || "Invalid city"
              })}
            />
            <SecondaryButton
              className='localization-btn'
              onClick={(event) => handleGetLocation(event, setLocation, setNearestCity)}>
              Get Location
            </SecondaryButton>
          </div>
          <div className="pair-of-inputs-container">
          <label htmlFor="sex">How do you identify yourself?</label>
            <select
              id="sex"
              defaultValue={user?.sex || 'select'}
              {...register('sex')}
            >
              <option value="select">Select</option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value="non-binary">Non-binary</option>
              <option value="transgender">Transgender</option>
            </select>
          </div>
          <div className="pair-of-inputs-container">
            <label htmlFor="lookingFor">What are you looking for?</label>
            <select
              id="lookingFor"
              defaultValue={user?.lookingFor || 'select'}
              {...register('lookingFor')}
            >
              <option value="select">Select</option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </select>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}