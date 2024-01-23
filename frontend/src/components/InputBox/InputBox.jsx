import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./InputBox.css"

const InputBox = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')


    const handleUserClick = () => {
        navigate(`/repolist/${username}`);
    }

    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    

    return (
        <div className='inputbox'>
            
            <input 
            type="text" 
            placeholder='Enter the username you want to search...' 
            onChange={handleChange}
            value={username}
            required
            />
            
            <button
            onClick={handleUserClick}
            >
                Search User
            </button>
        </div>
    )
}

export default InputBox