import reviewRepository from "../repositories/reviewRepository.js"
import logger from "../helpers/logger.js"

const addReview = async (userId, movie, rating, review) =>{
    try {
        logger.info('Review info', movie, review)
        await reviewRepository.createReview(userId, movie, rating, review)
        return {success:true}
    } catch (error) {
        logger.error(error, 'Review Adding error')
        return {success:false}
    }
}

const getAllReviews = async () =>{
    try {
        const allReviews=await reviewRepository.getAllReviews()
        return {success:true, reviews:allReviews}
    } catch (error) {
        logger.error(error, 'Cant get all reviews')
        return {success:false}
    }
}

const addComment = async (userId:string, review_id:string, comment:string) =>{
    try {
        logger.info('Comment', comment)
        await reviewRepository.addComment(userId, review_id, comment)
        return {success:true}
    } catch (error) {
        logger.error(error, 'Cant add comment')
        return {success:false}
    }
}

const getUserReviews = async (userId:string) =>{
    try {
        const reviews=await reviewRepository.getUserReviews(userId)
        return {success:true, reviews:reviews}
    } catch (error) {
        logger.error(error, 'Cant get user reviews')
        return {success:false}
    }
}

export default {
    addReview,
    getAllReviews,
    addComment,
    getUserReviews
}