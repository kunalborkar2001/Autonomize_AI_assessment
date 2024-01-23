import "./Card.css"

const Card = ({avatar_url, following, followers, name}) => {
  return (
    <div className="card">
        
    <img src={avatar_url} alt="kunalborkar20001@gmail.com" />
    
        <div className="details">
            <h4>{name}</h4>
            <div style={{display : "flex", gap: "20px"}}>
            <p>following: {following} </p>
            <p>followers: {followers} </p>
            </div>
        </div>
            
        
    </div>
  )
}

export default Card