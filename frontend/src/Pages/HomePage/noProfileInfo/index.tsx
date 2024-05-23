import { useEffect, useState } from 'react'
import { User } from '../../../interfaces/userInterface'
import './noProfileInfo.css'

type Props = {
  user: User | null
}

export const NoProfileInfoMessage = ({user}: Props) => {
  const [cityMissing, setCityMissing] = useState(false)
  const [sexMissing, setSexMissing] = useState(false)
  const [lookingForMissing, setLookingForMissing] = useState(false)
  const [birthdateMissing, setBirthdateMissing] = useState(false)
  const [ageMissing, setAgeMissing] = useState(false)
  
  const handleMissingInfo = () => {
    if (!user?.city) setCityMissing(true)
    if (!user?.sex) setSexMissing(true)
    if (!user?.lookingFor) setLookingForMissing(true)
    if (!user?.birthdate) setBirthdateMissing(true)
    if (!user?.age) setAgeMissing(true)
  }

  useEffect(() => {
    handleMissingInfo()
  }, [])

  return (
    <div className="noProfileInfo-container">
      {cityMissing && (
        <span>Your location is missing.</span>
      )}
      {sexMissing && (
        <span>Your sex is missing.</span>
      )}
      {lookingForMissing && (
        <span>Your sex preference is missing.</span>
      )}
      {birthdateMissing && (
        <span>Your birthdate is missing.</span>
      )}
      {ageMissing && (
        <span>Your age is missing.</span>
      )}
      <p>Please, go to your config page and fill the missing fields.</p>
    </div>
  )
}