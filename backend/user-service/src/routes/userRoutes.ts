import express from 'express'
import userController from '../controllers/userController.js'

const router=express.Router()

router.post('/userSignIn', userController.userSignIn)
router.post('/userLogIn', userController.userLogin)
router.post('/changePass', userController.changePass)
router.get('/getUserName', userController.getUserName)
router.get('/getUserDetails', userController.getUserDetails)
router.post('/editUser', userController.editUser)
router.get('/clearCookie', userController.clearCookie)
router.get('/getImage', userController.getImage)

export default router