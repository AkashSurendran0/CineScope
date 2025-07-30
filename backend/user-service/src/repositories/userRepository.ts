import User from "../models/userModel.js"

const findById = async () =>{

}

const findByEmail = async (email:string) =>{
    return User.findOne({where:{email:email}})
}

const createUser = async (name:string, email:string, password:string) => {
    return User.create({
        name,
        email,
        password
    })
}

const findByEmailAndUpdatePass = async (email:string, password:string) => {
    return User.update(
        {password:password},
        {where:{email:email}}
    )
}

const findUserById = async (userId:string) =>{
    return User.findByPk(userId)
}

const findByIdAndUpdate = async (userid:string, name:string, image:string) =>{
    return User.update(
        {
            name:name,
            image:image
        },
        {where:{id:userid}}
    )
}

export default {
    findById,
    findByEmail,
    createUser,
    findByEmailAndUpdatePass,
    findUserById,
    findByIdAndUpdate
}