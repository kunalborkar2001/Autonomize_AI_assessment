// server.js
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');
const User = require("./src/schema/schema")
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb+srv://kunalborkar2001:pveoINdiVlZx2wEm@kunalsmongo.5raphyd.mongodb.net/github_api_backend', { useNewUrlParser: true, useUnifiedTopology: true });


// Middleware
app.use(bodyParser.json());

// API endpoints
// 1. Accept GitHub username and save details into the database
app.post('/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Check if user already exists in the database
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists in the database.' });
        }

        // Fetch user data from GitHub API
        const githubResponse = await axios.get(`https://api.github.com/users/${username}`);

        // Check if GitHub user exists
        if (githubResponse.status !== 200) {
            return res.status(githubResponse.status).json({ message: 'GitHub user not found.' });
        }

        const userData = githubResponse.data;

        // Save user details into the database
        const newUser = new User({
            username: userData.login,
            id: userData.id,
            node_id: userData.node_id,
            avatar_url: userData.avatar_url,
            gravatar_id: userData.gravatar_id,
            url: userData.url,
            html_url: userData.html_url,
            followers_url: userData.followers_url,
            following_url: userData.following_url,
            gists_url: userData.gists_url,
            starred_url: userData.starred_url,
            subscriptions_url: userData.subscriptions_url,
            organizations_url: userData.organizations_url,
            repos_url: userData.repos_url,
            events_url: userData.events_url,
            received_events_url: userData.received_events_url,
            type: userData.type,
            site_admin: userData.site_admin,
            name: userData.name,
            company: userData.company,
            blog: userData.blog,
            location: userData.location,
            email: userData.email,
            hireable: userData.hireable,
            bio: userData.bio,
            twitter_username: userData.twitter_username,
            public_repos: userData.public_repos,
            public_gists: userData.public_gists,
            followers: userData.followers,
            following: userData.following,
            created_at: userData.created_at,
            updated_at: userData.updated_at,
            
            // Add other fields as needed
            // ...
        });

        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/users/search', async (req, res) => {
    try {
        const { username, location } = req.query;

        // Build the search query based on the provided parameters
        const searchQuery = {};

        if (username) {
            searchQuery.username = { $regex: new RegExp(username, 'i') }; // Case-insensitive search
        }

        if (location) {
            searchQuery['userdata.location'] = { $regex: new RegExp(location, 'i') };
        }

        // Search users in the database
        const searchResults = await User.find(searchQuery);

        res.status(200).json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a new API endpoint for soft deletion
app.delete('/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Find the user in the database
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Set the deleted flag to true
        user.deleted = true;

        // Save the updated user in the database
        await user.save();

        res.status(200).json({ message: 'User soft deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a new API endpoint for fetching and sorting all users
app.get('/users/sorted', async (req, res) => {
    try {
        const { sortBy } = req.query;

        // Validate the sortBy parameter
        const validSortFields = ['public_repos', 'public_gists', 'followers', 'following', 'created_at'];
        if (!validSortFields.includes(sortBy)) {
            return res.status(400).json({ message: 'Invalid sortBy parameter.' });
        }

        // Fetch and sort all users from the database
        const users = await User.find().sort({ [`userdata.${sortBy}`]: -1 });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
