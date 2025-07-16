import React,{useState} from 'react'
import { Star, Clock, User, X, Send } from 'lucide-react';
import Sidebar from 'sharedComp/Sidebar'
import Navbar from 'sharedComp/Navbar'

function YourReview() {
    const [selectedReview, setSelectedReview] = useState(null);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');

    // Sample movie reviews data
    const reviews = [
        {
        id: 1,
        title: "The Dark Knight",
        poster: "https://images.unsplash.com/photo-1489599077050-ded87be50326?w=300&h=400&fit=crop",
        rating: 4.5,
        reviewer: "Alex Johnson",
        date: "2 days ago",
        preview: "An absolute masterpiece that redefined superhero cinema...",
        fullReview: "The Dark Knight stands as one of the greatest superhero films ever made. Heath Ledger's portrayal of the Joker is haunting and unforgettable, bringing a level of chaos and unpredictability that elevates the entire film. Christopher Nolan's direction is masterful, weaving together complex themes of morality, justice, and the thin line between hero and villain. The action sequences are expertly choreographed, and the film's dark, gritty tone perfectly captures the essence of Gotham City. This is not just a superhero movie; it's a crime thriller that happens to feature Batman.",
        genre: "Action, Crime, Drama"
        },
        {
        id: 2,
        title: "Inception",
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop",
        rating: 4.8,
        reviewer: "Sarah Chen",
        date: "1 week ago",
        preview: "A mind-bending journey through dreams within dreams...",
        fullReview: "Inception is a tour de force of filmmaking that challenges audiences to think deeply about the nature of reality and dreams. Christopher Nolan has crafted a complex narrative that operates on multiple levels, literally and figuratively. The film's exploration of shared dreaming is both scientifically fascinating and emotionally resonant. Leonardo DiCaprio delivers a powerful performance as Dom Cobb, a man haunted by his past and desperate for redemption. The practical effects and cinematography are stunning, creating dreamscapes that feel both surreal and believable. This is cinema at its most ambitious and rewarding.",
        genre: "Sci-Fi, Thriller"
        },
    ];

    const handleReviewClick = (review) => {
        setSelectedReview(review);
    };

    const handleCloseModal = () => {
        setSelectedReview(null);
        setNewComment('');
    };

    const handleAddComment = () => {
        if (newComment.trim() && selectedReview) {
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
        <div>
            <Navbar/>
            <div className='flex'>
                <Sidebar/>
                <div className="min-h-screen bg-gray-50">
                {/* Main Content */}
                <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Reviews</h2>
                    
                    {/* Reviews Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div
                        key={review.id}
                        onClick={() => handleReviewClick(review)}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
                        >
                        <div className="aspect-w-3 aspect-h-4 bg-gray-200">
                            <img
                            src={review.poster}
                            alt={review.title}
                            className="w-full h-48 object-cover"
                            />
                        </div>
                        
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 truncate">
                                {review.title}
                            </h3>
                            <div className="flex items-center space-x-1">
                                {renderStars(review.rating)}
                            </div>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {review.preview}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{review.reviewer}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{review.date}</span>
                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Modal */}
                {selectedReview && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {selectedReview.title}
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
                                src={selectedReview.poster}
                                alt={selectedReview.title}
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
                                <span className="font-semibold">Genre:</span> {selectedReview.genre}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                <span className="font-semibold">Reviewer:</span> {selectedReview.reviewer}
                                </p>
                                <p className="text-sm text-gray-600">
                                <span className="font-semibold">Date:</span> {selectedReview.date}
                                </p>
                            </div>
                            </div>
                            
                            <div className="md:w-2/3">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review</h3>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {selectedReview.fullReview}
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
                                
                                {(!comments[selectedReview.id] || comments[selectedReview.id].length === 0) && (
                                    <p className="text-gray-500 text-sm italic text-center py-8">
                                    No comments yet. Be the first to share your thoughts!
                                    </p>
                                )}
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
        </div>
    )
}

export default YourReview
