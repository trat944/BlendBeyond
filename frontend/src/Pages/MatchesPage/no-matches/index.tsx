import './no-matches.css'


export const NoMatches = () => {
  return (
    <div className="noMatches-container">
      <img  
          src={'/noMatches.jpg'} 
          alt="No more users" 
      />
      <span>You don´t have any matches yet!</span>
    </div>
  )
}

