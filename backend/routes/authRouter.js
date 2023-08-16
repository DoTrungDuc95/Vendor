import express from 'express';
import CustomError from '../utils/errors.js';
import sendMail from '../utils/sendMail.js';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';

import User from '../models/userModel.js';

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  try {
    if (!name || !email || !password)
      return next(new CustomError('Invalid request', 400));

    const userEmail = await User.findOne({ email }).exec();

    if (userEmail) {
      return next(new CustomError('Email already exists', 400));
    }

    let img = { public_id: '', url: '' };
    if (avatar) {
      cloudinary.v2.uploader.upload(
        avatar,
        { upload_preset: 'vendor' },
        (error, result) => {
          if (error) {
            console.log(error);
            return next(new CustomError('Cannot upload avatar', 500));
          }

          img.public_id = result.public_id;
          img.url = result.url;
        }
      );
    }

    const user = {
      name,
      email,
      password,
      avatar: img,
    };

    const signupToken = jwt.sign({ user }, process.env.SIGNUP_TOKEN_SECRET, {
      expiresIn: '15m',
    });

    const signupUrl = `http://localhost:3000/active/${signupToken}`;

    try {
      await sendMail({
        email,
        subject: 'Activate your account',
        message: `Hello ${user.name}, please click on the link to activate your account: ${signupUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `please check your email:- ${email} to activate your account!`,
      });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
});

//active account
router.post('/active-account', async (req, res, next) => {
  const { active_token } = req.body;

  try {
    if (!active_token) return next(new CustomError('Invalid request', 400));

    const newUser = jwt.verify(active_token, process.env.SIGNUP_TOKEN_SECRET);

    if (!newUser) return next(new CustomError('Invalid token', 400));

    let user = await User.findOne({ email: newUser.email }).exec();

    if (user) {
      return next(new CustomError('User already exists', 400));
    }

    user = await User.create({ ...newUser.user });

    res.status(201).json({ success: true, user });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return next(new CustomError('Invalid request', 400));

    const user = await User.login(email, password);

    const { name, email: mail, avatar, role } = user;

    const accessToken = user.getAccessToken();

    const refreshToken = await user.getRefreshToken();

    res
      .cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true, //https
        sameSite: 'None', //cross-site cookie
        maxAge: 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      })
      .json({ name, email: mail, avatar, role, accessToken });
  } catch (error) {
    if (error instanceof CustomError) return next(error);
    return next(new CustomError(error.message, 500));
  }
});

router.get('/refresh', async (req, res, next) => {
  const cookies = req.cookies;

  try {
    if (!cookies?.jwt) return next(new CustomError('Unauthorized', 401));

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, id) => {
        if (err) {
          return next(new CustomError('Forbidden', 403));
        }

        const foundUser = await User.findById(id);

        if (!foundUser) return next(new CustomError('Unauthorized', 401));

        const accessToken = jwt.sign(
          {
            id: foundUser._id,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
});

router.get('/signout', async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  try {
    const user = await User.findOne({ 'tokens.token': cookies.jwt }).exec();

    if (!user)
      next(
        new CustomError(
          'This account is currently not logged in or does not exist',
          400
        )
      );

    user.tokens = user.tokens.filter((t) => t.token !== cookies.jwt);

    await user.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    res.json({ message: 'Log out', success: true });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
});

export default router;
