import { generateAccessToken, generateRefreshToken } from "../helpers/tokenGenerator.js";
import redisClient from "../helpers/redisClient.js";
import userServices from '../services/userService.js';
const userSignIn = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await userServices.userSignIn(name, email, password);
        if (!newUser.success)
            return res.json({ success: false, message: newUser.message });
        const accessToken = await generateAccessToken({ _id: newUser.user.id });
        const refreshToken = await generateRefreshToken({ _id: newUser.user.id });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ success: true, token: accessToken, message: "User Signed up Successfully" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error please try again" });
    }
};
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userServices.userLogIn(email, password);
        if (!result.success)
            return res.json({ success: false, message: result.message });
        const accessToken = await generateAccessToken({ _id: result.user.id });
        const refreshToken = await generateRefreshToken({ _id: result.user.id });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ success: true, token: accessToken, message: "User Logged in Successfully" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error please try again" });
    }
};
const changePass = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userServices.changePass(email, password);
        if (!result.success)
            return res.json({ success: false, message: result.message });
        res.json({ success: true, message: result.message });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error please try again" });
    }
};
const getUserName = async (req, res) => {
    try {
        const userId = req.query.user;
        const user = await userServices.getUserName(userId);
        if (!user.success)
            return res.json({ success: false, message: user.message });
        if (user.image)
            return res.json({ success: true, user: user.name, image: user.image });
        res.json({ success: true, user: user.name });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error please try again" });
    }
};
const getUserDetails = async (req, res) => {
    try {
        const userId = req.headers["user-id"];
        const details = await userServices.getUserDetails(userId);
        res.json({ success: true, user: details.user });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error please login again" });
    }
};
const editUser = async (req, res) => {
    try {
        const userId = req.headers["user-id"];
        const { name, image } = req.body;
        const result = await userServices.editUser(userId, name, image);
        if (result.success)
            res.json({ success: true, message: "Profile updated successfully" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error please try again" });
    }
};
const clearCookie = async (req, res) => {
    try {
        await redisClient.del("userImage");
        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "strict",
        });
        res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server Error please try again" });
    }
};
const getImage = async (req, res) => {
    try {
        const cachedImage = await redisClient.get("userImage");
        if (cachedImage) {
            console.log("Cache Hit");
            return res.json({ success: true, image: cachedImage });
        }
        const userId = req.headers["user-id"];
        const result = await userServices.getImage(userId);
        if (result.success)
            res.json({ success: true, image: result.image });
        else
            res.json({ success: false });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
};
export default {
    userSignIn,
    userLogin,
    changePass,
    getUserName,
    getUserDetails,
    editUser,
    clearCookie,
    getImage,
};
