const express = require('express');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/api/animals', async (req, res) => {
    const animal = req.query.animal || 'Tiger';

    // Mock mode: Return a hardcoded response instead of calling RapidAPI
    if (process.env.MOCK_MODE === 'true') {
        console.log('Mock mode enabled. Returning mock data...');
        const mockData = [
            {
                Animal: 'Mock Lion',
                AverageSpeed: '50 km/h',
                Habitat: 'Savannah',
                Lifespan: '12 years',
            },
            {
                Animal: 'Mock Tiger',
                AverageSpeed: '60 km/h',
                Habitat: 'Jungle',
                Lifespan: '15 years',
            },
        ];
        return res.json(mockData);
    }

    // Actual API call
    const apiUrl = `https://animals7.p.rapidapi.com/api/animals?animal=${animal}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'animals7.p.rapidapi.com',
            },
        });

        console.log(`RapidAPI Response Status: ${response.status}`); // Log the status code

        if (!response.ok) {
            const errorData = await response.text(); // Log the error response body
            console.error('RapidAPI Error Response:', errorData);
            return res.status(response.status).send('Error fetching data from RapidAPI');
        }

        const data = await response.json();
        console.log('RapidAPI Response Data:', data); // Log the response data

        res.json(data);
    } catch (error) {
        console.error('Error fetching data from RapidAPI:', error.message); // Log the error message
        res.status(500).send('Error fetching data from RapidAPI');
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

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
        // Add more animals here
    ];
    res.json(supportedAnimals);
});