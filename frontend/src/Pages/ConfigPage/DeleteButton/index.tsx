import { useContext, useState } from "react"
import { User } from "../../../interfaces/userInterface"
import { UserService } from "../../../services/UserService"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../hooks/userContext"
import { Modal } from "../../../components/Modal"
import { LogButton } from "../../../styled_components/logButton"
import { SecondaryButton } from "../../../styled_components/logoutButton"
import './deletebutton.css'
import { DangerButton } from "../../../styled_components/dangerButton"

type Props = {
  user: User | null
}

export const DeleteButton = ({user}: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const {dispatch} = useContext(UserContext)

  const openDeleteModal = () => {
    setOpenModal(true)
  }

  const closeDeleteModal = () => {
    setOpenModal(false)
  }

  const deleteAccount = async (user: User | null) => {
    if (user) {
      const response = await UserService.deleteUser(user.id)
      await UserService.logoutUser()
      if (response) {
        navigate('/')
        dispatch({ type: 'LOGOUT' });
      }
    }
  }

  return (
    <>
      <LogButton onClick={openDeleteModal}>Delete Account</LogButton>
      {openModal && (
        <Modal onOpen={setOpenModal}>
            <div className="delete-modal-container">
            <span>Are you sure you want to delete your account? You will lose:</span>
            <ul>
              <li>All matches</li>
              <li>All open conversations</li>
              <li>All profile info</li>
            </ul>
            <SecondaryButton className="goback-button" onClick={closeDeleteModal}>Go Back</SecondaryButton>
            <DangerButton className="delete-button" onClick={() => deleteAccount(user)}>Delete Account</DangerButton>
          </div>
        </Modal>
      )}
    </>
    
  )
}

