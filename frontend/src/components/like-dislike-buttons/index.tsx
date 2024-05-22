import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './like-dislike-buttons.css'
import { User } from "../../interfaces/userInterface"
import { MouseEventHandler, useContext } from "react"
import { UserContext } from "../../hooks/userContext"
import { LikeService } from "../../services/LikeService"
import { DislikeService } from "../../services/DislikeService"

type Props = {
    user: User | null
    onHandleCardWhenLiked: () => void;
    onHandleCardWhenDisliked: () => void;
}

export const LikeDislikeButtons = ({user, onHandleCardWhenLiked, onHandleCardWhenDisliked}: Props) => {
    const { state, dispatch } = useContext(UserContext);
    const loggedUser: User | null = state.user;

    const createLike: MouseEventHandler<SVGSVGElement> | undefined = async () => {
        if (loggedUser?.id || user?.id) {
            const response = await LikeService.createLike(loggedUser?.id, user?.id)
            dispatch({ type: 'UPDATE_LIKED_USERS', payload: response });
            onHandleCardWhenLiked()
        }
    }

    const createDislike: MouseEventHandler<SVGSVGElement> | undefined = async () => {
        if (loggedUser?.id || user?.id) {
            const response = await DislikeService.createDislike(loggedUser?.id, user?.id)
            dispatch({ type: 'UPDATE_DISLIKED_USERS', payload: response });
            console.log(response)
            onHandleCardWhenDisliked()
        }
    }

    return (
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
    )
}
