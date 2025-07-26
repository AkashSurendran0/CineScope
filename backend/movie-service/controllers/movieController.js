import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const fetchMovies = async (req,res) =>{
    try {
        const film=req.query.query
        try {
            const response=await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params:{
                    api_key: process.env.tmdb_KEY,
                    query: film
                }
            })
            const firstFiveMovies=response.data.results.slice(0,5)
            res.json({success:true, movies:firstFiveMovies})
        } catch (error) {
            console.log(error)
            res.json({success:false, message:'Server error please refresh the page'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Server error please try again later'})
    }
}

export default {
    fetchMovies
}