import { Request, Response } from 'express';
import mongoose from 'mongoose';
import reviewService from '../services/reviewService.js';

interface Movie {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
}

interface AddReviewBody {
  movie: Movie;
  rating: number;
  review: string;
}

interface AddCommentBody {
  review_id: string;
  comment: string;
}

const addReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.headers['user-id'] as string;
    const { movie, rating, review } = req.body as AddReviewBody;
    const result=await reviewService.addReview(userId, movie, rating, review)
    if(result.success) res.json({success:true})
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error please try again later' });
  }
};

const getAllReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const result=await reviewService.getAllReviews()
    res.json({ success: true, reviews: result.reviews });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching reviews, please try again' });
  }
};

const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.headers['user-id'] as string;
    const { review_id, comment } = req.body as AddCommentBody;
    const result=await reviewService.addComment(userId, review_id, comment)
    res.json({success:true})
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error please try again later' });
  }
};

const getUserReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.headers['user-id'] as string;
    const result=await reviewService.getUserReviews(user)
    res.json({ success: true, reviews:result.reviews });
  } catch (error) {
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
