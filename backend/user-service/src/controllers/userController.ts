import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../helpers/tokenGenerator.js";
import redisClient from "../helpers/redisClient.js";
import { Request, Response } from "express";

const userSignIn = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await Users.findOne({ where:{email:email} });
    if (user) return res.json({ success: false, message: "Email already exists" });

    const hashedPass = await bcrypt.hash(password, 10);
    const data = {
      name,
      email,
      password: hashedPass,
    };

    const newUser = await Users.create(data);
    const accessToken = await generateAccessToken({ _id: newUser._id.toString() });
    const refreshToken = await generateRefreshToken({ _id: newUser._id.toString() });


    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, token: accessToken, message: "User Signed up Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error please try again" });
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where:{email:email} });
    if (!user) return res.json({ success: false, message: "User doesn't exist" });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.json({ success: false, message: "Invalid Credentials" });

    const accessToken = await generateAccessToken({ _id: user.id});
    const refreshToken = await generateRefreshToken({ _id: user.id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, token: accessToken, message: "User Logged in Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error please try again" });
  }
};

const changePass = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where:{email:email} });
    if (!user) return res.json({ success: false, message: "User doesn't exist" });

    const hashedPass = await bcrypt.hash(password, 10);
    await Users.update(
      {password: hashedPass},
      {where:{email:email}}
    )
    res.json({ success: true, message: "Please login with new credentials" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error please try again" });
  }
};

const getUserName = async (req: Request, res: Response) => {
  try {
    const userId = req.query.user as string;
    const user = await Users.findByPk(userId);
    if (user) {
      if (user.image) return res.json({ success: true, user: user.name, image: user.image });
      return res.json({ success: true, user: user.name });
    }
    res.json({ success: false, message: "User not found" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error please try again" });
  }
};

const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["user-id"] as string;
    const user = await Users.findByPk(userId);
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error please login again" });
  }
};

const editUser = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["user-id"] as string;
    const { name, image } = req.body;
    await Users.update(
      {
        name: name,
        image: image
      },
      {where:{id:userId}}
    )
    await redisClient.del("userImage");
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error please try again" });
  }
};

const clearCookie = async (req: Request, res: Response) => {
  try {
    await redisClient.del("userImage");
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error please try again" });
  }
};

const getImage = async (req: Request, res: Response) => {
  try {
    const cachedImage = await redisClient.get("userImage");
    if (cachedImage) {
      console.log("Cache Hit");
      return res.json({ success: true, image: cachedImage });
    }

    const userId = req.headers["user-id"] as string;
    const user = await Users.findByPk(userId);
    if (user?.image) {
      await redisClient.setEx("userImage", 60 * 60, user.image);
      return res.json({ success: true, image: user.image });
    }
    res.json({ success: false });
  } catch (error) {
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
