import { useForm } from 'react-hook-form';
import './searcher.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { UserWithLastMessage } from '../../interfaces/userWithLastMessage';
import { User } from '../../interfaces/userInterface';

type Props = {
  usersWithLastMessage?: UserWithLastMessage[],
  setUsersWithConversation?: React.Dispatch<React.SetStateAction<UserWithLastMessage[]>>,
  users?: User[],
  setMatchedUsers?: React.Dispatch<React.SetStateAction<User[]>>,
  setSearcherTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

export const SearcherBarForUsers = ({usersWithLastMessage, setUsersWithConversation, users, setMatchedUsers, setSearcherTrigger}: Props) => {
  const {register, handleSubmit, reset} = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (usersWithLastMessage) {
      const filteredUsers = usersWithLastMessage.filter(user => {
        const userName = user.user.name.toLowerCase();
        const searchName = data.name.toLowerCase();
        return userName === searchName || userName.includes(searchName);
      });
      if (setUsersWithConversation) {
        setUsersWithConversation(filteredUsers);
        setSearcherTrigger(false);
        reset();
      }
    } else if (users) {
      const filteredUsers = users.filter(user => {
        const userName = user.name.toLowerCase();
        const searchName = data.name.toLowerCase();
        return userName === searchName || userName.includes(searchName);
      });
      if (setMatchedUsers) {
        setMatchedUsers(filteredUsers);
        setSearcherTrigger(false);
        reset();
      }
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="search-container">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="text"
        className='search-bar'
        {...register('name', {
          required: true
        })}
        />
      </div>
    </form>
  )
}