import { useContext, useState } from "react"
import { User } from "../../../interfaces/userInterface"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../hooks/userContext"
import { Modal } from "../../../components/Modal"
import { LogButton } from "../../../styled_components/logButton"
import { SecondaryButton } from "../../../styled_components/logoutButton"
import './logoutButton.css'

type Props = {
  user: User | null
}

export const LogoutButton = ({user}: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const {dispatch} = useContext(UserContext)

  const openDeleteModal = () => {
    setOpenModal(true)
  }

  const closeDeleteModal = () => {
    setOpenModal(false)
  }

  const handleLogout = async (user: User | null) => {
    if (user) {
      navigate('/')
      dispatch({ type: 'LOGOUT' });
    }
  }

  return (
    <>
      <LogButton onClick={openDeleteModal}>Logout</LogButton>
      {openModal && (
        <Modal onOpen={setOpenModal}>
          <div className="logout-button-container">
          <span>Are you sure you want to logout?</span>
            <SecondaryButton className="goback-button" onClick={closeDeleteModal}>Go Back</SecondaryButton>
            <SecondaryButton className="logout-button" onClick={() => handleLogout(user)}>Logout</SecondaryButton>
          </div>
        </Modal>
      )}
    </>
    
  )
}