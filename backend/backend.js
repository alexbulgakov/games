import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

const baseUrl = 'https://free-to-play-games-database.p.rapidapi.com/api';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ENTER_YOUR_KEY_HERE', // ВСТАВЬТЕ ВАШ КЛЮЧ RAPID API
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.static('build'));

app.get('/api/getItems', async (req, res) => {
    const { platform, sort, signal } = req.query;
    const fetchOptions = {
        ...options,
        signal: signal,
    };
    const externalUrl = `${baseUrl}/games?platform=${platform}&sort-by=${sort}`;
    try {
        const response = await fetch(externalUrl, fetchOptions);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Ошибка при получении данных');
    }
});

app.get('/api/getItem', async (req, res) => {
    const { id, signal } = req.query;
    const fetchOptions = {
        ...options,
        signal: signal,
    };
    const externalUrl = `${baseUrl}/game?id=${id}`;
    try {
        const response = await fetch(externalUrl, fetchOptions);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Ошибка при получении данных');
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});