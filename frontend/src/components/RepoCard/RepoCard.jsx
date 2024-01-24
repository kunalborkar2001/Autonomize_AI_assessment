import { Link } from "react-router-dom"
import "./RepoCard.css"

const RepoCard = ({ image, name, description, id, repoData }) => {
  return (
    <Link style={{ textDecoration: "none", color: "black" }}
      to={`/repodesription/${id}`}
      state= {  repoData }
    >
      <div className="repoCard">
        <img src={image} alt="kunaborkar2001@gmail.com" />
        <div>
          <h4 >{name}</h4>
          <p>{description ? description : `The User has not provided and Description for ${name}`}</p>
        </div>
      </div>
    </Link>
  )
}

export default RepoCard