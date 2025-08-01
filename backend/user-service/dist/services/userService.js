import redisClient from "../helpers/redisClient.js";
import userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import logger from "../helpers/logger.js";
const userSignIn = async (name, email, password) => {
    try {
        logger.info('User signed', name);
        const user = await userRepository.findByEmail(email);
        if (user)
            return { success: false, message: 'User already exist' };
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = await userRepository.createUser(name, email, hashedPass);
        return { success: true, user: newUser };
    }
    catch (error) {
        logger.error(error, 'Cant signin');
        return { success: false, message: 'Server error please try again' };
    }
};
const userLogIn = async (email, password) => {
    try {
        logger.info('User logged', email);
        const user = await userRepository.findByEmail(email);
        if (!user)
            return { success: false, message: 'User doesnt exist' };
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch)
            return { success: false, message: 'Incorrect credentials' };
        return { success: true, user: user };
    }
    catch (error) {
        logger.error(error, 'Cant login');
        return { success: false, message: 'Server error please try again' };
    }
};
const changePass = async (email, password) => {
    try {
        logger.info('Pass changed');
        const user = await userRepository.findByEmail(email);
        if (!user)
            return { success: false, message: 'Email doesnt exist' };
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = await userRepository.findByEmailAndUpdatePass(email, password);
        return { success: true, message: 'Please login with new credentials' };
    }
    catch (error) {
        logger.error(error, 'Cant change pass');
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
        logger.error(error, 'Cant get user name');
        return { success: false, message: 'Server error please try again' };
    }
};
const getUserDetails = async (userid) => {
    try {
        const user = await userRepository.findUserById(userid);
        return { success: true, user: user };
    }
    catch (error) {
        logger.error(error, 'Cant get user details');
        return { success: false, message: 'Server error please try again' };
    }
};
const editUser = async (userid, name, image) => {
    try {
        logger.info('User edited', name);
        await userRepository.findByIdAndUpdate(userid, name, image);
        await redisClient.del('userImage');
        return { success: true };
    }
    catch (error) {
        logger.error(error, 'Cant edit user');
        return { success: false, message: 'Server error please try again' };
    }
};
const getImage = async (userid) => {
    try {
        const user = await userRepository.findUserById(userid);
        if (user?.image) {
            await redisClient.setEx("userImage", 60 * 60, user.image);
            return { success: true, image: user.image };
        }
        return { success: false };
    }
    catch (error) {
        logger.error(error, 'Cant get image');
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
