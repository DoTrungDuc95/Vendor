import React, { useEffect, useState } from 'react';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import axios from '@/axios';
import { toast } from 'react-toastify';

import { object, string, mixed, InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { FaTrash } from 'react-icons/fa';
import { AxiosError } from 'axios';

const Signup = () => {
  const [isPassword, setIsPassword] = useState(true);
  const [showAvatar, setShowAvatar] = useState<
    string | ArrayBuffer | null | undefined
  >('');
  const [status, setstatus] = useState<'none' | 'success' | 'error'>('none');

  const signupSchema = object().shape({
    name: string().required('Name is required'),
    email: string().email('Email is invalid').required('Email is required'),
    password: string().required('Password is required'),
    confirmPassword: string().required('You need to confirm your password'),
    avatar: mixed().nullable().notRequired(),
  });

  type SignupFormType = InferType<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    setValue,
    getValues,
  } = useForm<SignupFormType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: null,
    },
    resolver: yupResolver<SignupFormType>(signupSchema),
  });

  const pw = watch('password');
  const cfpw = watch('confirmPassword');
  const avatar = watch('avatar');

  useEffect(() => {
    const file: FileList = avatar as FileList;
    if (file?.length > 0) handlerAvatar(file[0]);
    else setShowAvatar(undefined);
  }, [avatar]);

  const handlerAvatar = (img: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(img);

    reader.onload = () => {
      if (reader.readyState === 2) setShowAvatar(reader.result);
    };
  };

  const submitForm: SubmitHandler<SignupFormType> = async (data) => {
    const { email, name, password, confirmPassword } = data;

    if (confirmPassword !== password) {
      setError(
        'confirmPassword',
        {
          type: 'custom',
          message: 'Confirm password not match your password',
        },
        { shouldFocus: true }
      );
      return;
    }

    const obj = { email, name, password, avatar: showAvatar };

    try {
      await axios.post('/signup', { ...obj });
      setstatus('success');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === 'Email already exists')
          setError(
            'email',
            {
              type: 'custom',
              message: 'This email is already exists',
            },
            { shouldFocus: true }
          );
      } else {
        toast.error('An error has occurred. Please try again later');
      }
      console.log(error);
    }
  };

  if (status === 'success')
    return (
      <main className="min-h-screen text-center ng-gray-50 grid place-items-center">
        <div className="bg-green-200 px-8 py-8 sm:text-lg">
          <p className="mb-6">
            We have sent a verification message to the{' '}
            <span className="font-bold">{getValues('email')}</span>. Check your
            email and activate your account.{' '}
            <span className="font-bold">
              It will no longer be valid after 15 minutes.
            </span>
          </p>
          <p>
            Back to{' '}
            <span className="font-bold hover:underline transition-all duration-200">
              <Link href="/">Home</Link>
            </span>
          </p>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 w-[95%] max-w-md mx-auto">
        <label className="justify-self-start text-center text-3xl sm:text-4xl font-extrabold text-gray-900">
          Sign up new account
        </label>

        <div className="sm:w-full sm:max-w-md sm:mx-auto ">
          <div className="bg-white py-8 px-4 sm:px-10 shadow-lg sm:rounded-lg">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="grid gap-1 mb-6">
                <label
                  htmlFor="name"
                  className="text-sm sm:text-base font-bold text-gray-700"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="name..."
                  {...register('name')}
                  className={`sm:text-lg px-3 py-2 border ${
                    errors.name ? 'border-red-600' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500  ${
                    errors.name
                      ? 'focus:border-red-600'
                      : 'focus:border-blue-500'
                  }`}
                />
                {errors.name && errors.name?.message && (
                  <span className="form-error">{errors.name.message}</span>
                )}
              </div>

              <div className="grid gap-1 mb-6">
                <label
                  htmlFor="email"
                  className="text-sm sm:text-base font-bold text-gray-700"
                >
                  Your email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="email..."
                  {...register('email')}
                  className={`sm:text-lg px-3 py-2 border ${
                    errors.email ? 'border-red-600' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500  ${
                    errors.email
                      ? 'focus:border-red-600'
                      : 'focus:border-blue-500'
                  }`}
                />
                {errors.email && errors.email?.message && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>

              <div className="grid gap-1 mb-6">
                <label
                  htmlFor="password"
                  className="text-sm sm:text-base font-bold text-gray-700"
                >
                  Your password
                </label>
                <div className="relative">
                  <input
                    type={isPassword ? 'password' : 'text'}
                    id="password"
                    placeholder="password..."
                    {...register('password')}
                    className={`sm:text-lg w-full px-3 pr-10 py-2 border  ${
                      errors.password ? 'border-red-600' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 ${
                      errors.password
                        ? 'focus:border-red-600'
                        : 'focus:border-blue-500'
                    }`}
                  />
                  {pw.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsPassword((p) => !p)}
                      className="absolute text-xl right-2 top-[50%] translate-y-[-50%] outline-none border-none"
                    >
                      {isPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </button>
                  )}
                </div>
                {errors.password && errors.password?.message && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </div>

              <div className="grid gap-1 mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm sm:text-base font-bold text-gray-700"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={isPassword ? 'password' : 'text'}
                    id="confirmPassword"
                    placeholder="confirm password..."
                    {...register('confirmPassword')}
                    className={`sm:text-lg w-full px-3 pr-10 py-2 border  ${
                      errors.confirmPassword
                        ? 'border-red-600'
                        : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 ${
                      errors.confirmPassword
                        ? 'focus:border-red-600'
                        : 'focus:border-blue-500'
                    }`}
                  />
                  {cfpw.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsPassword((p) => !p)}
                      className="absolute text-xl right-2 top-[50%] translate-y-[-50%] outline-none border-none"
                    >
                      {isPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </button>
                  )}
                </div>
                {errors.confirmPassword && errors.confirmPassword?.message && (
                  <span className="form-error">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div className="flex-type-1 gap-4 mb-6">
                {showAvatar ? (
                  <img
                    src={showAvatar as string}
                    alt="avatar"
                    className="object-cover rounded-full w-12 aspect-square"
                  />
                ) : (
                  <div>
                    <RxAvatar size={'3rem'} />
                  </div>
                )}
                <div className="flex-type-1 justify-between w-full">
                  <label
                    htmlFor="avatar"
                    className="text-sm sm:text-base font-bold text-gray-700 cursor-pointer"
                  >
                    Add your avatar
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    {...register('avatar')}
                    accept="image/png, image/jpg, image/jpeg"
                    className="sr-only"
                  />
                  {showAvatar && (
                    <button
                      type="button"
                      className="grid place-items-center p-2 rounded-full transition-all duration-200 hover:bg-[#0003]"
                      onClick={() => setValue('avatar', null)}
                      aria-label="remove avatar"
                    >
                      <FaTrash size="1.25rem" />
                    </button>
                  )}
                </div>
                {errors.avatar && errors.avatar?.message && (
                  <span className="form-error">{errors.avatar.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Please wait...' : 'Submit'}
              </button>

              <p className="mt-8 font-bold text-sm">
                Already have an account?{' '}
                <span className="text-blue-500 hover:underline transition-all duration-200">
                  <Link href={'/login'}>Login</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions());
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
