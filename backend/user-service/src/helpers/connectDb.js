import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('User DB conected')
    } catch (error) {
        console.log('User DB connection failed', error)
    }
}

export default connectDb