import Users from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from "../helpers/tokenGenerator.js"
import redisClient from "../helpers/redisClient.js"

const userSignIn = async (req, res) =>{
    try {
        const {name, email, password}=req.body
        const user=await Users.findOne({email:email})
        if(user) return res.json({success:false, message:'Email already exists'})
        const hashedPass=await bcrypt.hash(password, 10)
        const data={
            name:name,
            email:email,
            password:hashedPass
        }
        const newUser=await Users.insertOne(data)
        const accessToken=await generateAccessToken(newUser)
        console.log('access token', accessToken)
        const refreshToken=await generateRefreshToken(newUser)
        console.log('refresh', refreshToken)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000
        })
        res.json({success:true, token:accessToken, message:'User Signedup Successfully'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Server Error please try again'})
    }
}

const userLogin = async (req,res) =>{
    try {
        const {email,password}=req.body
        const user=await Users.findOne({email:email})
        if(!user) return res.json({success:false, message:'User doesnt exist'})
        const passMatch=await bcrypt.compare(password, user.password)
        if(!passMatch) return res.json({success:false, message:'Invalid Credentials'})
        const accessToken=await generateAccessToken(user)
        const refreshToken=await generateRefreshToken(user)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7*24*60*60*1000
        })
        res.json({success:true, token:accessToken, message:'User Logged Successfully'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Server Error please try again'})
    }
}

const changePass = async (req,res) =>{
    try {
        const {email, password}=req.body
        const user=await Users.findOne({email:email})
        if(!user) return res.json({success:false, message:'User doesnt exist'})
        const hashedPass=await bcrypt.hash(password, 10)
        await Users.updateOne(
            {email:email},
            {$set:{
                password:hashedPass
            }}
        )
        res.json({success:true, message:'Please login with new credentials'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Server Error please try again'})
    }
}

const getUserName = async (req,res) =>{
    try {
        console.log('hererer')
        const userId=req.query.user
        const user=await Users.findById(userId)
        if(user){
            console.log('user', user)
            if(user.image) return res.json({success:true, user:user.name, image:user.image})
            res.json({success:true, user:user.name})
        } else {
            res.json({success:false, message:'User not found'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Server Error please try again'})
    }
}

const getUserDetails = async (req,res) =>{
    try {
        const userId=req.headers['user-id']
        const user=await Users.findById(userId)
        res.json({success:true, user:user})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Server Error please login again'})
    }
}   

const editUser = async (req,res) =>{
    try {
        const userId=req.headers['user-id']
        const {name, image}=req.body
        await Users.findByIdAndUpdate(
            userId,
            {$set:{
                name:name,
                image:image
            }}
        )
        await redisClient.del('userImage')
        res.json({success:true, message:'Profile updated successfully'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Server Error please try again'})
    }
}

const clearCookie = async (req,res) =>{
    try {
        await redisClient.del('userImage')
        res.clearCookie('refreshToken', {
            httpOnly:true,
            sameSite:true,
            sameSite:'strict'
        })
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Server Error please try again'})
    }
}

const getImage = async (req,res) =>{
    try {
        const cachedImage=await redisClient.get('userImage')
        if(cachedImage){
            console.log('Cache Hit')
            return res.json({success:true, image:cachedImage})
        }

        const userId=req.headers['user-id']
        const user=await Users.findById(userId)
        if(user.image){
            await redisClient.setEx('userImage', 60*60, user.image)
            res.json({success:true, image:user.image})
        }else{
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
}

export default {
    userSignIn,
    userLogin,
    changePass,
    getUserName,
    getUserDetails,
    editUser,
    clearCookie,
    getImage
}