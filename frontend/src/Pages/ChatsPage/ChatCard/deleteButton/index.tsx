import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import { Modal } from "../../../../components/Modal"
import { SecondaryButton } from "../../../../styled_components/logoutButton"
import './deleteButton.css'
import { deleteConversationWithButton } from "../../../../utils/deleteConversationButton"
import { DangerButton } from "../../../../styled_components/dangerButton"
import { UserWithLastMessage } from "../../../../interfaces/userWithLastMessage"
import { User } from "../../../../interfaces/userInterface"
import { UserContext } from "../../../../hooks/userContext"
import { getUsersWithChat } from "../../../../utils/petitionsToBackend"
import { StyledLi, StyledUl } from "../../../../styled_components/WarningListStyles"

type Props = {
  conversationId: string
  setUsersWithChatAndLastMessage: React.Dispatch<React.SetStateAction<UserWithLastMessage[]>>
}

export const DeleteButton = ({conversationId, setUsersWithChatAndLastMessage}: Props) => {
  const user: User | null = useContext(UserContext).state.user;
  const [openModal, setOpenModal] = useState(false)
  const trigger = true;

  const openDeleteModal = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    setOpenModal(true)
  }

  const closeDeleteModal = () => {
    setOpenModal(false)
  }

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      await deleteConversationWithButton(conversationId);
      getUsersWithChat(user, setUsersWithChatAndLastMessage)
      setOpenModal(false);
    } catch (error) {
      console.error('Error deleting conversation', error);
    }
  };

  return (
    <>
      <FontAwesomeIcon onClick={openDeleteModal} className="rubbish-icon" icon={faTrashCan} />
      {openModal && (
        <Modal trigger={trigger} onOpen={setOpenModal}>
          <div className="delete-button-container">
            <span>Are you sure you want to delete the conversation?</span>
            <StyledUl>
              <StyledLi>You will lose all messages</StyledLi>
              <StyledLi>You will find NAME in your matches list</StyledLi>
            </StyledUl>
              <div className="chat-button-container">
                <SecondaryButton className="goback-button" onClick={closeDeleteModal}>Go Back</SecondaryButton>
                <DangerButton className="delete-button" onClick={handleDelete}>Delete</DangerButton>
              </div>
          </div>
        </Modal>
      )}
    </>
    
  )
}