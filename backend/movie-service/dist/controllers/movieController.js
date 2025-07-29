import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const fetchMovies = async (req, res) => {
    try {
        const film = req.query.query;
        if (!film) {
            res.status(400).json({ success: false, message: 'Query parameter is missing' });
            return;
        }
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: process.env.tmdb_KEY,
                query: film,
            },
            timeout: 5000
        });
        const firstFiveMovies = response.data.results.slice(0, 5);
        res.json({ success: true, movies: firstFiveMovies });
    }
    catch (error) {
        console.error('[TMDB FETCH ERROR]', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};
export default {
    fetchMovies,
};
