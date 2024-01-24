import { Link } from "react-router-dom"
import "./FollowersCard.css"



const FollowersCard = ({ image, username, type, repos_url }) => {

  return (
    <Link  to={`/repolist/${username}`} style={{ textDecoration: "none", color: "black" }}>
      <div className="followersCard">
        <div>
          <img src={image} alt="kunalborkar2001@gmail.com" />
        </div>
        <div>
          <h2>{username}</h2>
          <p style={{ color: "gray" }}>type: {type}</p>
          <a href="{repos_url}">{repos_url}</a>
        </div>
      </div>
    </Link>

  )
}

export default FollowersCard