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
                        <img src={checkUser.avatar_url} alt="kunaborkar2001@gmail.com" style={{height: "90px", borderRadius: "50px"}}/>
                    <h1>{username}</h1>
                    <p>{checkUser.bio ? checkUser.bio : "The user have no bios"}</p>

                    </div>
                    <div className="gridRepoList">
                        {repoData.length> 0 && repoData.map((elem) => (
                            <RepoCard name={elem.name} image={elem.owner.avatar_url} description={elem.description}/>
                        ))}
                        
                    </div>
                </div>
            )}

        </div>
    )
}

export default Grid