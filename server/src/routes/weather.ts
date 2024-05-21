import express from 'express';
import axios from 'axios';

const router = express.Router();


router.get('/:destinationName', async (req, res) => {
    const { destinationName } = req.params;
    
    if (!destinationName) {
        return res.status(400).json({ error: 'Invalid destination name' });
    }

    try {
        const apiKey = '6c10bec1473d772497f49848894b3180';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${destinationName}&units=metric&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});


export default router;
