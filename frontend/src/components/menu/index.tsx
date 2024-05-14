import './menu.css'
import { faComment, faListUl, faUser, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'

export const Menu = () => {
    return (
    <div className="menu-container">
        <Link to={'/homepage'}>
            <FontAwesomeIcon className='menu_icon' icon={faUsersViewfinder} />
        </Link>
        <FontAwesomeIcon className='menu_icon' icon={faListUl} />
        <FontAwesomeIcon className='menu_icon' icon={faComment} />
        <Link to={'/configpage'}>
            <FontAwesomeIcon className='menu_icon' icon={faUser} />
        </Link>
    </div>
    )
}