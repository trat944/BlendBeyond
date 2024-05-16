import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './like-dislike-buttons.css'
import { User } from "../../interfaces/userInterface"
import { useContext } from "react"
import { UserContext } from "../../hooks/userContext"
import { LikeService } from "../../services/LikeService"

type Props = {
    user: User | null
}

export const LikeDislikeButtons = ({user}: Props) => {
    const loggedUser: User | null = useContext(UserContext).state.user

    const createLike = async () => {
        if (loggedUser?.id || user?.id) {
            const response = await LikeService.createLike(loggedUser?.id, user?.id)
            console.log(response)
        }
    }

    return (
        <div className="button-container">
            <FontAwesomeIcon className="button dislike-button" icon={faHeartCrack} />
            <FontAwesomeIcon 
            className="button like-button"
            onClick={createLike}
            icon={faHeart} />
        </div>
    )
}