import { useForm } from 'react-hook-form';
import './searcher.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { UserWithLastMessage } from '../../interfaces/userWithLastMessage';

type Props = {
  users: UserWithLastMessage[],
  setUsers: React.Dispatch<React.SetStateAction<UserWithLastMessage[]>>
  setSearcherTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

export const SeacherBar = ({users, setUsers, setSearcherTrigger}: Props) => {
  const {register, handleSubmit, reset} = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const filteredUsers = users.filter(user => {
      const userName = user.user.name.toLowerCase();
      const searchName = data.name.toLowerCase();
      return userName === searchName || userName.includes(searchName);
    });
    setUsers(filteredUsers);
    setSearcherTrigger(false);
    reset();
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