import mongoose from 'mongoose';
import Reviews from '../models/reviewModel.js';
const addReview = async (req, res) => {
    try {
        const userId = req.headers['user-id'];
        const { movie, rating, review } = req.body;
        if (!movie || !rating || !review) {
            res.status(400).json({ success: false, message: 'Missing fields' });
            return;
        }
        const data = {
            user: userId,
            verti_image: movie.backdrop_path,
            hori_image: movie.poster_path,
            name: movie.original_title,
            rating,
            review,
            comments: []
        };
        await Reviews.create(data);
        res.json({ success: true });
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Server error please try again later' });
    }
};
const getAllReviews = async (_req, res) => {
    try {
        const allReviews = await Reviews.find();
        res.json({ success: true, reviews: allReviews });
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Error fetching reviews, please try again' });
    }
};
const addComment = async (req, res) => {
    try {
        const userId = req.headers['user-id'];
        const { review_id, comment } = req.body;
        await Reviews.updateOne({ _id: new mongoose.Types.ObjectId(review_id) }, {
            $push: {
                comments: {
                    user: userId,
                    comment
                }
            }
        });
        res.json({ success: true });
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Server error please try again later' });
    }
};
const getUserReviews = async (req, res) => {
    try {
        const user = req.headers['user-id'];
        const reviews = await Reviews.find({ user });
        res.json({ success: true, reviews });
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Server error please try again' });
    }
};
export default {
    addReview,
    getAllReviews,
    addComment,
    getUserReviews
};
