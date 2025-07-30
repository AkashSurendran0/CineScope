import reviewRepository from "../repositories/reviewRepository.js"

const addReview = async (userId, movie, rating, review) =>{
    try {
        await reviewRepository.createReview(userId, movie, rating, review)
        return {success:true}
    } catch (error) {
        return {success:false}
    }
}

const getAllReviews = async () =>{
    try {
        const allReviews=await reviewRepository.getAllReviews()
        return {success:true, reviews:allReviews}
    } catch (error) {
        return {success:false}
    }
}

const addComment = async (userId:string, review_id:string, comment:string) =>{
    try {
        await reviewRepository.addComment(userId, review_id, comment)
        return {success:true}
    } catch (error) {
        return {success:false}
    }
}

const getUserReviews = async (userId:string) =>{
    try {
        const reviews=await reviewRepository.getUserReviews(userId)
        return {success:true, reviews:reviews}
    } catch (error) {
        return {success:false}
    }
}

export default {
    addReview,
    getAllReviews,
    addComment,
    getUserReviews
}