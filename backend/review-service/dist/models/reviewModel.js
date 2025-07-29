import mongoose, { Schema } from 'mongoose';
const reviewSchema = new Schema({
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
}, { timestamps: true });
const Reviews = mongoose.model('reviews', reviewSchema);
export default Reviews;
