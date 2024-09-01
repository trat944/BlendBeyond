import './no-chats.css'


export const NoChats = () => {
  return (
    <div className="noChats-container">
      <img  
          src={'/no-chats.jpg'} 
          alt="No open conversations" 
      />
      <span>No open conversations!</span>
    </div>
  )
}