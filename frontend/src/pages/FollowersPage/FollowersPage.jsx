import { useLocation } from "react-router-dom";
import "./FollowersPage.css"
import FollowersCard from "../../components/FollowersCard/FollowersCard";
const FollowersPage = () => {
    const location = useLocation();


    const { state } = location;

  return (
    <div className="followersPage">
        {state.length>0 && state.map((elem) => 
          <FollowersCard image={elem.avatar_url} username={elem.login}  type={elem.type} repos_url={elem.repos_url}/>
        )}
        {!state || state.length === 0 && <h1>No Followers</h1>}
    </div>
  )
}

export default FollowersPage