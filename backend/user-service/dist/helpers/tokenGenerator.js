import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const generateAccessToken = async (user) => {
    console.log('access', user);
    const secret = process.env.ACCESS_SECRET;
    if (!secret)
        throw new Error('ACCESS_SECRET not defined in environment');
    return jwt.sign({ userId: user._id }, secret, { expiresIn: '15m' });
};
export const generateRefreshToken = async (user) => {
    console.log('refresh', user);
    const secret = process.env.REFRESH_SECRET;
    if (!secret)
        throw new Error('REFRESH_SECRET not defined in environment');
    return jwt.sign({ userId: user._id }, secret, { expiresIn: '7d' });
};
