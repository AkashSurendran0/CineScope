import React,{useState} from 'react'
import { Search, Star, User, Check, X } from 'lucide-react';
import Navbar from 'sharedComp/Navbar'
import Sidebar from 'sharedComp/Sidebar'

function AddReview() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    // Sample movie database
    const movieDatabase = [
        {
        id: 1,
        title: "The Dark Knight",
        year: 2008,
        poster: "https://images.unsplash.com/photo-1489599077050-ded87be50326?w=300&h=400&fit=crop",
        genre: "Action, Crime, Drama",
        director: "Christopher Nolan"
        },
        {
        id: 2,
        title: "Inception",
        year: 2010,
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop",
        genre: "Sci-Fi, Thriller",
        director: "Christopher Nolan"
        },
        {
        id: 3,
        title: "Parasite",
        year: 2019,
        poster: "https://images.unsplash.com/photo-1489599077050-ded87be50326?w=300&h=400&fit=crop",
        genre: "Thriller, Drama, Comedy",
        director: "Bong Joon-ho"
        },
        {
        id: 4,
        title: "Dune",
        year: 2021,
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop",
        genre: "Sci-Fi, Adventure, Drama",
        director: "Denis Villeneuve"
        },
        {
        id: 5,
        title: "The Grand Budapest Hotel",
        year: 2014,
        poster: "https://images.unsplash.com/photo-1489599077050-ded87be50326?w=300&h=400&fit=crop",
        genre: "Comedy, Drama, Adventure",
        director: "Wes Anderson"
        },
        {
        id: 6,
        title: "Mad Max: Fury Road",
        year: 2015,
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop",
        genre: "Action, Adventure, Sci-Fi",
        director: "George Miller"
        },
        {
        id: 7,
        title: "Interstellar",
        year: 2014,
        poster: "https://images.unsplash.com/photo-1489599077050-ded87be50326?w=300&h=400&fit=crop",
        genre: "Sci-Fi, Drama, Adventure",
        director: "Christopher Nolan"
        },
        {
        id: 8,
        title: "The Social Network",
        year: 2010,
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=400&fit=crop",
        genre: "Drama, Biography",
        director: "David Fincher"
        }
    ];

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim()) {
        setShowResults(true);
        } else {
        setShowResults(false);
        }
    };

    const filteredMovies = movieDatabase.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
        setSearchQuery(movie.title);
        setShowResults(false);
    };

    const handleStarClick = (starRating) => {
        setRating(starRating);
    };

    const handleStarHover = (starRating) => {
        setHoverRating(starRating);
    };

    const handleStarLeave = () => {
        setHoverRating(0);
    };

    const handleSubmitReview = () => {
        if (selectedMovie && rating > 0 && reviewText.trim()) {
        // Here you would typically send the review to your backend
        console.log({
            movie: selectedMovie,
            rating,
            review: reviewText.trim(),
            timestamp: new Date().toISOString()
        });
        
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            // Reset form
            setSelectedMovie(null);
            setSearchQuery('');
            setRating(0);
            setReviewText('');
        }, 2000);
        }
    };

    const renderStars = (interactive = false) => {
        const stars = [];
        const currentRating = interactive ? (hoverRating || rating) : rating;
        
        for (let i = 1; i <= 5; i++) {
        stars.push(
            <Star
            key={i}
            className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
                i <= currentRating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 hover:text-yellow-400'
            }`}
            onClick={() => interactive && handleStarClick(i)}
            onMouseEnter={() => interactive && handleStarHover(i)}
            onMouseLeave={() => interactive && handleStarLeave()}
            />
        );
        }
        
        return stars;
    };

    const isFormValid = selectedMovie && rating > 0 && reviewText.trim().length > 0;

    return (
        <>
            <Navbar/>
            <div className='flex'>
                <Sidebar/>
                <div className="flex-1 min-h-screen bg-gray-50">

                {/* Main Content */}
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Add Review</h2>
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                    {/* Movie Search Section */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search for a Movie
                        </label>
                        <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search by movie title, director, or genre..."
                        />
                        
                        {/* Search Results Dropdown */}
                        {showResults && searchQuery && (
                            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                            {filteredMovies.length > 0 ? (
                                filteredMovies.map((movie) => (
                                <div
                                    key={movie.id}
                                    onClick={() => handleMovieSelect(movie)}
                                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 flex items-center space-x-3"
                                >
                                    <img
                                    src={movie.poster}
                                    alt={movie.title}
                                    className="w-12 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                    <div className="font-medium text-gray-900">
                                        {movie.title} ({movie.year})
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {movie.director} • {movie.genre}
                                    </div>
                                    </div>
                                </div>
                                ))
                            ) : (
                                <div className="py-4 text-center text-gray-500">
                                No movies found matching your search.
                                </div>
                            )}
                            </div>
                        )}
                        </div>
                    </div>

                    {/* Selected Movie Section */}
                    {selectedMovie && (
                        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Movie</h3>
                        <div className="flex items-start space-x-4">
                            <img
                            src={selectedMovie.poster}
                            alt={selectedMovie.title}
                            className="w-24 h-32 object-cover rounded-lg shadow-md"
                            />
                            <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                                {selectedMovie.title} ({selectedMovie.year})
                            </h4>
                            <p className="text-gray-600 mb-1">
                                <span className="font-medium">Director:</span> {selectedMovie.director}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Genre:</span> {selectedMovie.genre}
                            </p>
                            <button
                                onClick={() => {
                                setSelectedMovie(null);
                                setSearchQuery('');
                                setRating(0);
                                setReviewText('');
                                }}
                                className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                <X className="w-4 h-4 inline mr-1" />
                                Remove Selection
                            </button>
                            </div>
                        </div>
                        </div>
                    )}

                    {/* Rating Section */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                        Your Rating
                        </label>
                        <div className="flex items-center space-x-1">
                        {renderStars(true)}
                        {rating > 0 && (
                            <span className="ml-3 text-sm text-gray-600">
                            {rating} out of 5 stars
                            </span>
                        )}
                        </div>
                    </div>

                    {/* Review Text Section */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                        </label>
                        <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows="8"
                        placeholder="Write your detailed review here... What did you think about the movie? What were its strengths and weaknesses?"
                        />
                        <div className="mt-1 text-sm text-gray-500">
                        {reviewText.length}/1000 characters
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                        onClick={handleSubmitReview}
                        disabled={!isFormValid}
                        className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
                            isFormValid
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        >
                        Submit Review
                        </button>
                    </div>
                    </div>
                </div>

                {/* Success Modal */}
                {showSuccess && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Review Submitted!
                        </h3>
                        <p className="text-gray-600">
                        Your review has been successfully added to CineScope.
                        </p>
                    </div>
                    </div>
                )}
                </div>
            </div>
        </>
    )
}

export default AddReview
