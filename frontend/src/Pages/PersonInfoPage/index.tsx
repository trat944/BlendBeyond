import { useLocation, useNavigate } from 'react-router-dom'
import { User } from '../../interfaces/userInterface'
import './personInfoPage.css'
import { MouseEventHandler, useContext, useEffect, useState } from 'react'
import { Menu } from '../../components/menu'
import { LikeService } from '../../services/LikeService'
import { UserContext } from '../../hooks/userContext'
import { DislikeService } from '../../services/DislikeService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faComment, faHeart, faHeartCrack } from '@fortawesome/free-solid-svg-icons'
import { StyledLink } from '../../styled_components/chatCard'

type Props = {
  loggedUser: User | null
}

export const PersonInfoPage = ({loggedUser}: Props) => {
  const {dispatch} = useContext(UserContext)
  const navigate = useNavigate();
  const location = useLocation();
  const user: User = location.state.user;
  const [matchedUser, setMatchedUser] = useState<User>();

  const loggedUserId = loggedUser?.id;

  const differentiateUnknownOrMatched = () => {
    if (loggedUser?.likedUsers) {
      const likedUserIds = loggedUser.likedUsers.map((like: any) => like.toId);
      likedUserIds.forEach((id) => {
        if (user.id === id) return setMatchedUser(user)
      })
    }
  }

  const createLike: MouseEventHandler<SVGSVGElement> | undefined = async () => {
    if (loggedUser?.id || user?.id) {
        const response = await LikeService.createLike(loggedUser?.id, user?.id)
        dispatch({ type: 'UPDATE_LIKED_USERS', payload: response });
        navigate('/homepage')
    }
  }

  const createDislike: MouseEventHandler<SVGSVGElement> | undefined = async () => {
      if (loggedUser?.id || user?.id) {
          const response = await DislikeService.createDislike(loggedUser?.id, user?.id)
          dispatch({ type: 'UPDATE_DISLIKED_USERS', payload: response });
          navigate('/homepage')
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
      <img src={user.pictureUrl || './src/assets/th.jpg'} alt="" />
      <span className='person-age-name'>{user.name}, {user.age ? user.age : 'Age not available'}</span>
      <span>Here you will have all the info, destinations, bucketlist, pictures...etc</span>
      {matchedUser ? (
        <StyledLink to={`/conversation/${user.id}`} state={{ user, loggedUserId }}>
          <FontAwesomeIcon className='chat-button' icon={faComment} />
        </StyledLink>
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
      <FontAwesomeIcon className='retreat-button' onClick={goBack} icon={faChevronLeft} />
      <Menu />
    </div>
  )
}
