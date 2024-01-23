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

// // Define User schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   id : {type : String},

//   // Add other fields as needed (e.g., location, blog, bio)
//   // ...

//   // Soft delete flag
//   deleted: { type: Boolean, default: false },
// });

// const User = mongoose.model('User', userSchema);

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

// Implement other API endpoints as described

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
