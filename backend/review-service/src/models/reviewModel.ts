import mongoose, { Document, Schema, Model } from 'mongoose';

interface Comment {
  user?: string;
  comment?: string;
}

export interface ReviewDocument extends Document {
  user: string;
  verti_image: string;
  hori_image: string;
  name: string;
  rating: number;
  review: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema: Schema<ReviewDocument> = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    verti_image: {
      type: String,
      required: true,
    },
    hori_image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    comments: [
      {
        user: {
          type: String,
          required: false,
        },
        comment: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Reviews: Model<ReviewDocument> = mongoose.model<ReviewDocument>('reviews', reviewSchema);

export default Reviews;
