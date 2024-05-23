import { useLocation, useNavigate } from 'react-router-dom'
import { User } from '../../interfaces/userInterface'
import './personInfoPage.css'
import { MouseEventHandler, useContext, useEffect, useState } from 'react'
import { Menu } from '../../components/Menu'
import { LikeService } from '../../services/LikeService'
import { UserContext } from '../../hooks/userContext'
import { DislikeService } from '../../services/DislikeService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faComment, faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons'

type Props = {
  loggedUser: User | null
}

export const PersonInfoPage = ({loggedUser}: Props) => {
  const {dispatch} = useContext(UserContext)
  const navigate = useNavigate();
  const location = useLocation();
  const targetedUser: User = location.state.user;
  const [matchedUser, setMatchedUser] = useState<User>();

  const differentiateUnknownOrMatched = () => {
    if (loggedUser?.likedUsers) {
      const likedUserIds = loggedUser.likedUsers.map((like: any) => like.toId);
      likedUserIds.forEach((id) => {
        if (targetedUser.id === id) return setMatchedUser(targetedUser)
      })
    }
  }

  const createLike: MouseEventHandler<SVGSVGElement> | undefined = async () => {
    if (loggedUser?.id || targetedUser?.id) {
        const response = await LikeService.createLike(loggedUser?.id, targetedUser?.id)
        dispatch({ type: 'UPDATE_LIKED_USERS', payload: response });
    }
  }

  const createDislike: MouseEventHandler<SVGSVGElement> | undefined = async () => {
      if (loggedUser?.id || targetedUser?.id) {
          const response = await DislikeService.createDislike(loggedUser?.id, targetedUser?.id)
          dispatch({ type: 'UPDATE_DISLIKED_USERS', payload: response });
          console.log(response)
      }
  }

  const goBack = () => {
    navigate(-1);
  }

  useEffect(() => {
    differentiateUnknownOrMatched()
  }, [])

  return (
    <div className="personInfo-container">
      <img src={targetedUser.pictureUrl || './src/assets/th.jpg'} alt="" />
      <span className='person-age-name'>{targetedUser.name}, {targetedUser.age ? targetedUser.age : 'Age not available'}</span>
      <span>Here you will have all the info, destinations, bucketlist, pictures...etc</span>
      {matchedUser ? (
        <FontAwesomeIcon className='menu_icon' icon={faComment} />
      ) : (
        <div className="button-container">
          <FontAwesomeIcon 
          className="button dislike-button" 
          onClick={createDislike}
          icon={faHeartCrack} />

          <FontAwesomeIcon 
          className="button like-button"
          onClick={createLike}
          icon={faHeart} />
        </div>
      )}
      <FontAwesomeIcon onClick={goBack} icon={faChevronLeft} />
      <Menu />
    </div>
  )
}
