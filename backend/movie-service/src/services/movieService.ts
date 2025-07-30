import axios from "axios";

const fetchMovies = async (film:string) =>{
    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: process.env.tmdb_KEY,
                query: film,
            },
            timeout: 5000 
        });
        const firstFiveMovies = response.data.results.slice(0, 5);
        return {success:true, movies:firstFiveMovies}
    } catch (error) {
        return {success:false, message:'Server error please try again'}
    }
}

export default {
    fetchMovies
}