import { useEffect } from "react"
import InputBox from "../../components/InputBox/InputBox"
import { getAllUsers } from "../../Apis"
import Grid from "../../components/Grid/Grid";





const Home = () => {

    
    async function fetchData() {
        try {
            const users = await getAllUsers();
            console.log('All users:', users);
        } catch (error) {
            console.error('Error in fetchData:', error.message);
        }
    }
    
    // Call the async function
    fetchData();


    return (
        <div className="home">
            <InputBox />
            <Grid homeRepo={true}/>
        </div>
    )
}

export default Home