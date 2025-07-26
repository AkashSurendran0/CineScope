import express from 'express'
import { movieProxy } from '../utils/createProxy.js'

const router=express.Router()

router.use('/', movieProxy());

export default router