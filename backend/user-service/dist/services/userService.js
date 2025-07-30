import redisClient from "../helpers/redisClient.js";
import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
const userSignIn = async (name, email, password) => {
    try {
        const user = await userRepository.findByEmail(email);
        if (user)
            return { success: false, message: 'User already exist' };
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = await userRepository.createUser(name, email, hashedPass);
        return { success: true, user: newUser };
    }
    catch (error) {
        return { success: false, message: 'Server error please try again' };
    }
};
const userLogIn = async (email, password) => {
    try {
        const user = await userRepository.findByEmail(email);
        if (!user)
            return { success: false, message: 'User doesnt exist' };
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch)
            return { success: false, message: 'Incorrect credentials' };
        return { success: true, user: user };
    }
    catch (error) {
        return { success: false, message: 'Server error please try again' };
    }
};
const changePass = async (email, password) => {
    try {
        const user = await userRepository.findByEmail(email);
        if (!user)
            return { success: false, message: 'Email doesnt exist' };
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = await userRepository.findByEmailAndUpdatePass(email, password);
        return { success: true, message: 'Please login with new credentials' };
    }
    catch (error) {
        return { success: false, message: 'Server error please try again' };
    }
};
const getUserName = async (userid) => {
    try {
        const user = await userRepository.findUserById(userid);
        if (!user)
            return { success: false, message: 'Server Error please try again' };
        return { succesS: true, user: user };
    }
    catch (error) {
        return { success: false, message: 'Server error please try again' };
    }
};
const getUserDetails = async (userid) => {
    try {
        const user = await userRepository.findById(userid);
        return { success: true, user: user };
    }
    catch (error) {
        return { success: false, message: 'Server error please try again' };
    }
};
const editUser = async (userid, name, image) => {
    try {
        await userRepository.findByIdAndUpdate(userid, name, image);
        await redisClient.del('userImage');
        return { success: true };
    }
    catch (error) {
        return { success: false, message: 'Server error please try again' };
    }
};
const getImage = async (userid) => {
    try {
        const user = await userRepository.findById(userid);
        if (user?.image) {
            await redisClient.setEx("userImage", 60 * 60, user.image);
            return { success: true, image: user.image };
        }
        return { success: false };
    }
    catch (error) {
        return { success: false, message: 'Server error please try again' };
    }
};
export default {
    userSignIn,
    userLogIn,
    changePass,
    getUserName,
    getUserDetails,
    editUser,
    getImage
};
