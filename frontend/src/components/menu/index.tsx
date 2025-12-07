import './menu.css'
import { faComment, faListUl, faUser, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useLocation } from 'react-router-dom'

export const Menu = () => {
    const location = useLocation();
    
    const isActive = (path: string) => location.pathname === path;

    return (
    <nav className="menu-container">
        <Link to={'/homepage'} className={`menu-item ${isActive('/homepage') ? 'active' : ''}`}>
            <FontAwesomeIcon className='menu_icon' icon={faUsersViewfinder} />
            <span className="menu-label">Discover</span>
        </Link>
        <Link to={'/matches'} className={`menu-item ${isActive('/matches') ? 'active' : ''}`}>
            <FontAwesomeIcon className='menu_icon' icon={faListUl} />
            <span className="menu-label">Matches</span>
        </Link>
        <Link to={'/chats'} className={`menu-item ${isActive('/chats') ? 'active' : ''}`}>
            <FontAwesomeIcon className='menu_icon' icon={faComment} />
            <span className="menu-label">Messages</span>
        </Link>
        <Link to={'/configpage'} className={`menu-item ${isActive('/configpage') ? 'active' : ''}`}>
            <FontAwesomeIcon className='menu_icon' icon={faUser} />
            <span className="menu-label">Profile</span>
        </Link>
    </nav>
    )
}