import reviewService from '../services/reviewService.js';
const addReview = async (req, res) => {
    try {
        const userId = req.headers['user-id'];
        const { movie, rating, review } = req.body;
        const result = await reviewService.addReview(userId, movie, rating, review);
        if (result.success)
            res.json({ success: true });
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Server error please try again later' });
    }
};
const getAllReviews = async (req, res) => {
    try {
        const result = await reviewService.getAllReviews();
        res.json({ success: true, reviews: result.reviews });
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
        const result = await reviewService.addComment(userId, review_id, comment);
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
        const result = await reviewService.getUserReviews(user);
        res.json({ success: true, reviews: result.reviews });
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
