import express from 'express'
import reviewController from '../controllers/reviewController'

const router=express.Router()

router.post('/addReview', reviewController.addReview)
router.get('/getAllReviews', reviewController.getAllReviews)
router.post('/addComment', reviewController.addComment)
router.get('/getUserReviews', reviewController.getUserReviews)

export default router