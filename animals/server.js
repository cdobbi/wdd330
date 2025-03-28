import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Animal Explorer API! Use /api/animals or /api/supported-animals.');
});

// Route to fetch animal data from RapidAPI
app.get('/api/animals', async (req, res) => {
    const animal = req.query.animal || 'Tiger'; // Default to 'Tiger' if no query parameter is provided

    try {
        const apiUrl = `https://animals7.p.rapidapi.com/api/animals?animal=${animal}`;
        console.log(`Fetching data from: ${apiUrl}`); // Log the API URL

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'animals7.p.rapidapi.com',
            },
        });

        console.log(`RapidAPI Response Status: ${response.status}`); // Log the status code

        if (!response.ok) {
            const errorData = await response.text();
            console.error('RapidAPI Error Response:', errorData); // Log the error response body
            return res.status(response.status).json({
                error: 'Error fetching data from RapidAPI',
                details: errorData,
            });
        }

        const data = await response.json();
        console.log('RapidAPI Response Data:', data); // Log the response data
        res.json(data); // Return the fetched data to the frontend
    } catch (error) {
        console.error('Error fetching data from RapidAPI:', error.message); // Log the error message
        res.status(500).json({
            error: 'Error fetching data from RapidAPI',
            details: error.message,
        });
    }
});

// Route to return hardcoded supported animals
app.get('/api/supported-animals', (req, res) => {
    const supportedAnimals = [
        'Tiger',
        'Lion',
        'Elephant',
        'Blue Whale',
        'Giant Panda',
        'Koala',
        'Penguin',
        'Giraffe',
    ];
    res.json(supportedAnimals);
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));