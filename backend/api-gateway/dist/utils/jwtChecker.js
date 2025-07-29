import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const excludedPaths = ['/userLogIn', '/userSignIn', '/clearCookie', '/getUserName'];
export const verifyToken = async (req, res, next) => {
    console.log(req.path);
    if (excludedPaths.includes(req.path)) {
        return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.json({ success: false, message: 'Server error please try again' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_SECRET, async (err, decoded) => {
        if (err) {
            console.log('oneeee');
            const newToken = await createNewAccessToken(req, res);
            if (!newToken)
                return res.json({ success: false, message: 'Invalid token please login again' });
            req.userId = newToken.userId;
            req.accessToken = newToken.accessToken;
            req.headers['user-id'] = newToken.userId;
            req.headers['new-access-token'] = newToken.accessToken;
            next();
        }
        else {
            console.log('twoooooo', decoded);
            req.userId = decoded.userId;
            console.log(req.userId);
            req.headers['user-id'] = decoded.userId;
            next();
        }
    });
};
const createNewAccessToken = (req, res) => {
    return new Promise((resolve) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return resolve(null);
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err)
                return resolve(null);
            try {
                const typedDecoded = decoded;
                const newAccessToken = jwt.sign({ userId: typedDecoded.userId }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
                resolve({
                    accessToken: newAccessToken,
                    userId: typedDecoded.userId
                });
            }
            catch (error) {
                console.error(error);
                resolve(null);
            }
        });
    });
};
