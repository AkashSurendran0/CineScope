import { getUserModel } from "../models/userModel.js";


const findByEmail = async (email:string) =>{
    const User=getUserModel()
    return User.findOne({where:{email:email}})
}

const createUser = async (name:string, email:string, password:string) => {
    const User=getUserModel()
    return User.create({
        name,
        email,
        password
    })
}

const findByEmailAndUpdatePass = async (email:string, password:string) => {
    const User=getUserModel()
    return User.update(
        {password:password},
        {where:{email:email}}
    )
}

const findUserById = async (userId:string) =>{
    const User=getUserModel()
    console.log('asdf', userId)
    return User.findByPk(userId)
}

const findByIdAndUpdate = async (userid:string, name:string, image:string) =>{
    const User=getUserModel()
    return User.update(
        {
            name:name,
            image:image
        },
        {where:{id:userid}}
    )
}

export default {
    findByEmail,
    createUser,
    findByEmailAndUpdatePass,
    findUserById,
    findByIdAndUpdate
}