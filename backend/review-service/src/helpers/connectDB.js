import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Review DB connect successfully')
    } catch (error) {
        console.log('Review DB connection failed', error)
    }
}

export default connectDb