import express from 'express'
import dotenv from 'dotenv'
import reviewRouter from './routes/reviewRoutes.js'
import connectDb from './helpers/connectDB.js'

dotenv.config()
const app=express()
connectDb()

app.use(express.json())

app.use('/', reviewRouter)

const PORT = process.env.PORT || 5563

app.listen(PORT, ()=>{
    console.log(`Review service running at ${PORT}`)
})