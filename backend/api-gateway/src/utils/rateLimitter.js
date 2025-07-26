import {rateLimit} from 'express-rate-limit'

export const rateLimitter=rateLimit({
    windowMs:15*60*1000,
    max:50,
    standardHeaders:true,
    legacyHeaders:false,
    handler:(req,res)=>{
        res.json({success:false, message:'Too many request, please try again later'})
    }
})