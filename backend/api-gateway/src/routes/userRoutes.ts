import express from 'express'
import { userProxy } from '../utils/createProxy'
import { verifyToken } from '../utils/jwtChecker';

const router=express.Router()

router.use('/', verifyToken, userProxy());

export default router