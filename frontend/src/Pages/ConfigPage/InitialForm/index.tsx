import { useForm } from 'react-hook-form'
import { User } from '../../../interfaces/userInterface'
import './initialForm.css'
import { UserService } from '../../../services/UserService'
import { useContext, useEffect, useState } from 'react'
import { getAge } from '../../../utils/getAge'
import { handleGetLocation } from '../../../utils/getLocation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { SecondaryButton } from '../../../styled_components/logoutButton'
import { UserContext } from '../../../hooks/userContext'
import { getFormattedDate, getOriginalDate } from '../../../utils/getFormattedDate'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  user: User | null
}

export const ProfileSumUp = ({user}: Props) => {
  const [userAge, setUserAge] = useState<number>()
  const [nearestCity, setNearestCity] = useState<string>('');
  const [formattedTime, setFormattedTime] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showDateModal, setShowDateModal] = useState<boolean>(false)
  const {register, handleSubmit, setValue, formState: { errors }} = useForm();
  const {dispatch} = useContext(UserContext)
  
  const onSubmit = handleSubmit(async (data) => {
    const age = getAge(data.birthdate);
    if (age !== undefined) setUserAge(age);
    if (formattedTime && !data.birthdate) {
      data.birthdate = formattedTime
      setUserAge(getAge(formattedTime))
    }
    data.birthdate = getOriginalDate(data.birthdate)
    
    // Include user's pictureId for backend to delete old image if needed
    const updatedUser = { 
      ...user, 
      ...data, 
      age,
      pictureId: user?.pictureId || null 
    };
    
    const response = await UserService.updateUser(updatedUser);
    if (response) {
      window.localStorage.setItem('userLogged', JSON.stringify(response));
      dispatch({ type: 'LOGIN', payload: response });
      // Update preview with new image from server
      if (response.pictureUrl) {
        setPreviewImage(response.pictureUrl);
      }
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (user?.birthdate) {
      const formattedDate = getFormattedDate(user?.birthdate)
      setFormattedTime(formattedDate)
      setSelectedDate(new Date(user.birthdate))
      setValue('birthdate', formattedDate)
    }
    if (user?.birthdate) {
      const age = getAge(user?.birthdate);
      setUserAge(age);
    }
    if (user?.city) {
      setNearestCity(user?.city)
      setValue('city', user?.city)
    }
    if (user?.pictureUrl) {
      setPreviewImage(user.pictureUrl)
    }
  }, [user, setValue]);

  useEffect(() => {
    if (nearestCity) {
      setValue('city', nearestCity)
    }
  }, [nearestCity, setValue]);

  return (
    <div className="userProfile_container">
      <form onSubmit={onSubmit}>
        <div className="profilePicContainer">
          <label htmlFor="fileInput" className="profilePicContainer">
            <FontAwesomeIcon className='change-pic' icon={faPen} />
            <img className='profilePic' src={previewImage || user?.pictureUrl} alt="" />
            <input
              className='img-input'
              id="fileInput"
              type='file'
              accept="image/*"
              {...register('selfImage')}
              onChange={(e) => {
                register('selfImage').onChange(e);
                handleImageChange(e);
              }}
            />
          </label>
        </div>
        <span className='user-name-age'>{user?.name}, {userAge}</span>
        <div className="input-container">
          <input
            type="text"
            value={formattedTime}
            onClick={() => setShowDateModal(true)}
            placeholder="Select birthdate"
            readOnly
            className="date-input-display"
          />
          <div className="pair-of-inputs-container">
            <input
              id='city'
              type="text"
              placeholder="Ciudad"
              value={nearestCity}
              {...register('city')}
              onChange={(e) => {
                setNearestCity(e.target.value);
                register('city').onChange(e);
              }}
            />
            <SecondaryButton
              type="button"
              className='localization-btn'
              onClick={(event) => handleGetLocation(event, setNearestCity)}>
              Get Location
            </SecondaryButton>
          </div>
          {errors.city && <span className="error-message">{errors.city.message as string}</span>}
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
        <SecondaryButton type="submit">Submit</SecondaryButton>
      </form>

      {/* Date Picker Modal */}
      {showDateModal && (
        <div className="date-modal-overlay" onClick={() => setShowDateModal(false)}>
          <div className="date-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Select your birthdate</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => {
                setSelectedDate(date)
                if (date) {
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const day = String(date.getDate()).padStart(2, '0');
                  const formatted = `${day} / ${month} / ${year}`;
                  setFormattedTime(formatted)
                  setValue('birthdate', formatted)
                  setUserAge(getAge(date.toISOString()))
                }
              }}
              onMonthChange={(date: Date) => {
                // When month changes, set to first day of that month
                const newDate = new Date(date.getFullYear(), date.getMonth(), 1)
                setSelectedDate(newDate)
                const year = newDate.getFullYear();
                const month = String(newDate.getMonth() + 1).padStart(2, '0');
                const day = String(newDate.getDate()).padStart(2, '0');
                const formatted = `${day}-${month}-${year}`;
                setFormattedTime(formatted)
                setValue('birthdate', formatted)
                setUserAge(getAge(newDate.toISOString()))
              }}
              onYearChange={(date: Date) => {
                // When year changes, set to first day of current month in that year
                const currentMonth = selectedDate?.getMonth() || 0
                const newDate = new Date(date.getFullYear(), currentMonth, 1)
                setSelectedDate(newDate)
                const year = newDate.getFullYear();
                const month = String(newDate.getMonth() + 1).padStart(2, '0');
                const day = String(newDate.getDate()).padStart(2, '0');
                const formatted = `${day}-${month}-${year}`;
                setFormattedTime(formatted)
                setValue('birthdate', formatted)
                setUserAge(getAge(newDate.toISOString()))
              }}
              dateFormat="MM/dd/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="scroll"
              yearDropdownItemNumber={100}
              scrollableYearDropdown
              maxDate={new Date()}
              inline
            />
            <div className="date-modal-buttons">
              <SecondaryButton 
                type="button"
                onClick={() => setShowDateModal(false)}
              >
                Done
              </SecondaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}