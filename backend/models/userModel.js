import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import CustomError from '../utils/errors.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name!'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email!'],
      trim: true,
      unique: [true, 'This email is already existed'],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [4, 'Password must be greater than 4 characters'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    addresses: [
      {
        country: {
          type: String,
          trim: true,
        },
        city: {
          type: String,
          trim: true,
        },
        address1: {
          type: String,
          trim: true,
        },
        address2: {
          type: String,
          trim: true,
        },
        zipCode: {
          type: Number,
          trim: true,
        },
        addressType: {
          type: String,
          trim: true,
        },
      },
    ],
    role: {
      type: String,
      default: 'user',
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true }
);

userSchema.static('login', async function (email, password) {
  const user = await User.findOne({ email }).exec();
  if (!user) {
    throw new CustomError('Can not find email', 401);
  }
  const test = await bcrypt.compare(password, user.password);

  if (!test) {
    throw new CustomError('Password not match', 401);
  }

  return user;
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.method('getAccessToken', function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
});

userSchema.method('getRefreshToken', async function () {
  const token = jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });

  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
});

userSchema.method.getSignupToken = function () {
  return jwt.sign({ user: this }, process.env.SIGNUP_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const User = mongoose.model('User', userSchema);

export default User;
