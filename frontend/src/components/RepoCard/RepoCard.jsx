import "./RepoCard.css"

const RepoCard = ({image, name, description}) => {
  return (
    <div className="repoCard"> 
        <img src={image} alt="kunaborkar2001@gmail.com" />
        <div>
            <h4>{name}</h4>
            <p>{description? description : `The User has not provided and Description for ${name}`}</p>
        </div>
    </div>
  )
}

export default RepoCard