import mongoose from 'mongoose';
import Reviews from '../models/reviewModel.js';

const createReview = async (userid, movie, rating, review) =>{
    return Reviews.insertOne({
        user: userid,
        verti_image: movie.backdrop_path,
        hori_image: movie.poster_path,
        name: movie.original_title,
        rating,
        review,
        comments: []
    })
}

const getAllReviews = async () =>{
    return Reviews.find()
}

const addComment = async (userId:string, review_id:string, comment:string) =>{
    return Reviews.updateOne(
        {_id:new mongoose.Types.ObjectId(review_id)},
        {
            $push:{
                comments: {
                    user: userId,
                    comment
                }
            }
        }
    )
}

const getUserReviews = async (userid:string) =>{
    return Reviews.find({user:userid})
}

export default {
    createReview,
    getAllReviews,
    addComment,
    getUserReviews
}