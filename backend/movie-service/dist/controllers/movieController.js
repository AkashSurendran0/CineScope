import dotenv from 'dotenv';
import movieService from '../services/movieService.js';
dotenv.config();
const fetchMovies = async (req, res) => {
    try {
        const film = req.query.query;
        if (!film) {
            res.status(400).json({ success: false, message: 'Query parameter is missing' });
            return;
        }
        const result = await movieService.fetchMovies(film);
        if (result.success)
            res.json({ success: true, movies: result.movies });
        else
            res.json({ success: false, message: result.message });
    }
    catch (error) {
        console.error('[TMDB FETCH ERROR]', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};
export default {
    fetchMovies,
};
