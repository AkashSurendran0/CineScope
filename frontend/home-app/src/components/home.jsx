import React, {useState} from 'react'
import { Star, Clock, User, X, Send } from 'lucide-react';
import Navbar from 'sharedComp/Navbar'
import Sidebar from 'sharedComp/Sidebar'
import { useEffect } from 'react';
import axios from 'axios'
import {toast} from 'react-toastify'

function Home() {
    const [selectedReview, setSelectedReview] = useState(null);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [reviews, loadReviews]=useState(null)
    const [loadedComments, loadComments]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/reviews/getAllReviews', {
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response=>{
            console.log(response.data.success)
            if(response.data.success){
                loadReviews(response.data.reviews)
            }else{
                toast.error(response.data.message)
            }
        })
    }, [])

    const handleReviewClick = async (review) => {
        if (review.comments.length > 0) {
            console.log(review, 'reviewww')
            const commentsWithUser = await Promise.all(
                review.comments.map(async (comment) => {
                    const response = await axios.get(`http://localhost:5000/users/getUserName?user=${comment.user}`);
                    if (response.data.success) {
                        return {
                            user: response.data.user,
                            comment: comment.comment,
                            image: response.data.image?? null
                        };
                    } else {
                        toast.error(response.data.message);
                        return null;
                    }
                })
            );

            const validComments = commentsWithUser.filter(c => c !== null);
            console.log(validComments)
            loadComments(validComments);
        } else {
            loadComments([]);
        }

        setSelectedReview(review);
    };

    const handleCloseModal = () => {
        setSelectedReview(null);
        setNewComment('');
    };

    const handleAddComment = async () => {
        if (newComment.trim() && selectedReview) {
            const data={
                review_id:selectedReview._id,
                comment:newComment
            }
            const response=await axios.post('http://localhost:5000/reviews/addComment', data, {
                withCredentials:true,
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            if(response.data.success){
                const reviewComments = comments[selectedReview.id] || [];
                const newCommentObj = {
                    id: Date.now(),
                    text: newComment.trim(),
                    author: "You",
                    timestamp: "Just now"
                };
                
                setComments({
                    ...comments,
                    [selectedReview.id]: [...reviewComments, newCommentObj]
                });
                setNewComment('');
            }else{
                toast.error(response.data.message)
            }

        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }
        
        if (hasHalfStar) {
        stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
        stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
        }
        
        return stars;
    };

    return (
        <>
            <Navbar/>
            <div className='flex'>
                <Sidebar/>  
                <div className="min-h-screen bg-gray-50">
                {/* Main Content */}
                <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Reviews</h2>
                    
                    {/* Reviews Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews && reviews.length>0? reviews.map((review) => (
                        <div
                        onClick={() => handleReviewClick(review)}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
                        >
                        <div className="aspect-w-3 aspect-h-4 bg-gray-200">
                            <img
                            src={`https://image.tmdb.org/t/p/w500${review.verti_image}`}
                            alt={review.name}
                            className="w-full h-64 object-cover"
                            />
                        </div>
                        
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 truncate">
                                {review.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                                {renderStars(review.rating)}
                            </div>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {review.review}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>name</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>
                            </div>
                        </div>
                        </div>
                    )) : (
                        <div>No reviews currently :(</div>
                    )}
                    </div>
                </div>

                {/* Modal */}
                {selectedReview && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {selectedReview.name}
                        </h2>
                        <button
                            onClick={handleCloseModal}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        </div>
                        
                        <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/3">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${selectedReview.hori_image}`}
                                alt={selectedReview.name}
                                className="w-full rounded-lg shadow-md"
                            />
                            <div className="mt-4">
                                <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm font-semibold text-gray-700">Rating:</span>
                                <div className="flex items-center space-x-1">
                                    {renderStars(selectedReview.rating)}
                                    <span className="text-sm text-gray-600 ml-1">
                                    {selectedReview.rating}/5
                                    </span>
                                </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">
                                <span className="font-semibold">Reviewer:</span> name
                                </p>
                                <p className="text-sm text-gray-600">
                                <span className="font-semibold">Date:</span> {new Date(selectedReview.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            </div>
                            
                            <div className="md:w-2/3">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review</h3>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {selectedReview.review}
                            </p>
                            
                            {/* Comments Section */}
                            <div className="border-t pt-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Comments</h4>
                                
                                {/* Add Comment */}
                                <div className="mb-6">
                                <div className="flex space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                        rows="3"
                                    />
                                    <div className="flex justify-end mt-2">
                                        <button
                                        onClick={handleAddComment}
                                        disabled={!newComment.trim()}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                                        >
                                        <Send className="w-4 h-4" />
                                        <span>Post Comment</span>
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                {loadedComments && loadedComments.length>0 && (
                                    <div className="space-y-4">
                                    {loadedComments.map((comment) => (
                                        <div className="flex space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            {comment.image? (
                                                <img src={comment.image}/>
                                            ):(
                                                <User className="w-4 h-4 text-gray-600" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-semibold text-sm text-gray-900">
                                                {comment.user}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {comment.timestamp}
                                            </span>
                                            </div>
                                            <p className="text-gray-700 text-sm">{comment.comment}</p>
                                        </div>
                                        </div>
                                    ))}
                                    </div>
                                )}
                                
                                {/* Comments List */}
                                <div className="space-y-4">
                                {(comments[selectedReview.id] || []).map((comment) => (
                                    <div key={comment.id} className="flex space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-semibold text-sm text-gray-900">
                                            {comment.author}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {comment.timestamp}
                                        </span>
                                        </div>
                                        <p className="text-gray-700 text-sm">{comment.text}</p>
                                    </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                )}
                </div>   
            </div>
        </>
    )
}

export default Home
