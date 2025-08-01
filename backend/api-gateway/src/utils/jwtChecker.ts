import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


const excludedPaths = ['/userLogIn', '/userSignIn', '/clearCookie', '/getUserName'];

interface AuthenticatedRequest extends Request {
  path: string;
  userId?: string;
  accessToken?: string;
  headers: Request['headers'] & {
    'user-id'?: string;
    'new-access-token'?: string;
  };
}

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  console.log(req.path);

  if (excludedPaths.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.json({ success: false, message: 'Server error please try again' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_SECRET as string, async (err, decoded: any) => {
    if (err) {
      console.log('oneeee');
      const newToken = await createNewAccessToken(req, res);
      if (!newToken) return res.json({ success: false, message: 'Invalid token please login again' });

      req.userId = newToken.userId;
      req.accessToken = newToken.accessToken;
      req.headers['user-id'] = newToken.userId;
      req.headers['new-access-token'] = newToken.accessToken;
      next();
    } else {
      console.log('twoooooo', decoded);
      req.userId = decoded.userId;
      console.log(req.userId);
      req.headers['user-id'] = decoded.userId;
      next();
    }
  });
};

const createNewAccessToken = (req: Request, res: Response): Promise<{ accessToken: string; userId: string } | null> => {
    return new Promise((resolve) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return resolve(null);

        jwt.verify(
            refreshToken, 
            process.env.REFRESH_SECRET as string, 
            (err: VerifyErrors | null, decoded: unknown) => {
                if (err) return resolve(null);
                try {
                    const typedDecoded = decoded as { userId: string };
                    const newAccessToken = jwt.sign(
                        { userId: typedDecoded.userId },
                        process.env.ACCESS_SECRET as string,
                        { expiresIn: '15m' }
                    );
                    resolve({ 
                        accessToken: newAccessToken, 
                        userId: typedDecoded.userId 
                    });
                } catch (error) {
                    console.error(error);
                    resolve(null);
                }
            }
        );
    });
};
