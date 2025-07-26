import express from 'express'
import { userProxy } from '../utils/createProxy.js'
import { verifyToken } from '../utils/jwtChecker.js';

const router=express.Router()

router.use('/', verifyToken, userProxy());

export default router