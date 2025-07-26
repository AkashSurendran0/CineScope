import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateAccessToken = async (user) =>{
    console.log('access', user)
    return jwt.sign(
        {userId: user._id},
        process.env.ACCESS_SECRET,
        {expiresIn: '15m'}
    )
}

export const generateRefreshToken = async (user) =>{
    console.log('refresh', user)
    return jwt.sign(
        {userId: user._id},
        process.env.REFRESH_SECRET,
        {expiresIn: '7d'}
    )
}