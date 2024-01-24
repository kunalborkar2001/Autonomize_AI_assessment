import { useEffect, useState } from "react"
import { createUser, getAllUsers } from "../../Apis"
import Card from "../Card/Card"
import "./Grid.css"
import { Link } from "react-router-dom"
import RepoCard from "../RepoCard/RepoCard"



const Grid = ({ homeRepo, repoList, username }) => {
    const [gitUsers, setGitUsers] = useState([])
    const [checkUser, setcheckUser] = useState([])
    const [reposUrl, setReposUrl] = useState(null)
    const [repoData, setRepoData] = useState([])
    const [follwersData, setFollwersData] = useState([])

    useEffect(() => {
      if(checkUser.length !=0) {
        let followersData = async() => {
            let response = await fetch(checkUser.followers_url)
            let jsonData = await response.json()
            setFollwersData(jsonData)
        }
        followersData()
      }
    }, [checkUser.followers_url])
    

    useEffect(() => {
        let allUsersData = async () => {
            let data = await getAllUsers()
            setGitUsers(data)
        }
        allUsersData()
    }, [])

    useEffect(() => {
        if (username) {
            let checkUser = async () => {
                let data = await createUser(username)
                setcheckUser(data)
                setReposUrl(data.repos_url)
            }
            checkUser()
        }
    }, [username])

    useEffect(() => {
        if (reposUrl) {
            try {
                let data = async () => {
                    let response = await fetch(reposUrl)
                    let jsonData = await response.json()
                    setRepoData(jsonData)
                }
                data()
            } catch (error) {
                console.log(error);
            }
        }
    }, [reposUrl])




    return (
        <div className="grid">

            {homeRepo && gitUsers.map((elem) => (
                <Link to={`/repolist/${elem.username}`} style={{ color: "black", textDecoration: "none" }}>
                    <Card
                        key={elem.id}
                        avatar_url={elem.avatar_url}
                        followers={elem.followers}
                        following={elem.following}
                        name={elem.username}
                    />
                </Link>
            ))}

            {repoList && (
                <div>
                    <div>
                        <img src={checkUser.avatar_url} alt="kunaborkar2001@gmail.com" style={{ height: "90px", borderRadius: "50px" }} />
                        <h1>{username}</h1>
                        <p>{checkUser.bio ? checkUser.bio : "The user has no bio"}</p>
                        <Link to={`/followers/${username}`} state= { follwersData } style={{ color: "black", textDecoration: "none" }}><button style={{height : "2rem", width:"5rem", background:"cyan", opacity:"0.8", borderRadius:"12px"}}>Followers</button></Link>
                    </div>
                    <div className="gridRepoList">
                        {repoData.map((elem) => (
                            <RepoCard key={elem.id} id = {elem.id} name={elem.name} image={elem.owner.avatar_url} description={elem.full_name} repoData={elem}/>
                        ))}
                    </div>
                </div>
            )}


        </div>
    )
}

export default Grid