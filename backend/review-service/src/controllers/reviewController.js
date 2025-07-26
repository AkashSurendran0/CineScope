import Reviews from "../models/reviewModel.js"

const addReview = async (req,res) =>{
    try {
        const userId = req.headers['user-id']
        const {movie, rating, review}=req.body
        console.log(movie)
        const data={
            user:userId,
            verti_image:movie.backdrop_path,
            hori_image:movie.poster_path,
            name:movie.original_title,
            rating:rating,
            review:review   
        }
        await Reviews.insertOne(data)
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Server error please try again later'})
    }
}

const getAllReviews = async (req,res) =>{
    try {
        console.log('hererer')
        const allReviews=await Reviews.find()
        return res.json({success:true, reviews:allReviews})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Error fetching reviews, please try again'})
    }
}

const addComment = async (req,res) =>{
    try {
        const userId=req.headers['user-id']
        const {review_id, comment}=req.body
        await Reviews.updateOne(
            {_id:review_id},
            {$push:{
                comments:{
                    user:userId,
                    comment:comment
                }
            }}
        )
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Server error please try again later'})
    }
}

const getUserReviews = async (req,res) =>{
    try {
        const user=req.headers['user-id']
        const reviews=await Reviews.find({user:user})
        return res.json({success:true, reviews:reviews})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Server error please try again'})
    }
}

export default {
    addReview,
    getAllReviews,
    addComment,
    getUserReviews
}