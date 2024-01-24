// api.js

const url = "http://localhost:3001";

 async function getAllUsers() {
    const response = await fetch(`${url}/users/search`);

    try {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error to propagate it
    }
}

 async function createUser(username) {
    try {
        const response = await fetch(`${url}/users/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        return responseData; // Return the result if needed
    } catch (error) {
        console.error('Error:', error.message);
        throw error; // Rethrow the error to propagate it
    }
}





module.exports = {getAllUsers, createUser}