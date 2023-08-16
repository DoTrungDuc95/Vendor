import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  const user = await User.findOne({
    _id: decode.id,
    'tokens.token': refreshToken,
  }).exec();

  if (!user) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  req.token = token;
  req.user = user;
  next();
};

export { verifyJWT };
