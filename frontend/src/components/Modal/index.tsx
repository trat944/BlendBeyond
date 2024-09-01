import { ReactNode } from 'react'
import './modal.css'
import { ModalSetting } from '../../styled_components/modalSetting'
import { closeModal, closeModalWhenClickOutside } from '../../utils/closeModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

type Props = {
  children: ReactNode,
  onOpen: React.Dispatch<React.SetStateAction<boolean>>
  trigger?: boolean
}

export const Modal = ({children, onOpen, trigger}: Props) => {
  return (
    <ModalSetting onClick={(event)=> {closeModalWhenClickOutside(event, onOpen, trigger)}}>
      <div className="modal-container" >
        <FontAwesomeIcon className='closeBtn' icon={faXmark} onClick={() => {closeModal(onOpen)}} />
        <img className="modal-img" src="/logo.webp" alt="" />
          <div>
            {children}
          </div>
      </div>
    </ModalSetting>
  )
}

