import React, { useState } from 'react';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import { toast } from 'react-toastify';

import { object, string, InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from '@/axios';

const Login = () => {
  const router = useRouter();
  const [isPassword, setIsPassword] = useState(true);

  let loginSchema = object({
    email: string().email('Email is invalid').required('Email is required'),
    password: string().required('Password is required'),
  });

  type LoginFormType = InferType<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const submitForm: SubmitHandler<LoginFormType> = async (data) => {
    const { email, password } = data;
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (!res?.ok) toast.error('Login information is incorrect');
    else router.push('/');
  };

  const pw = watch('password');

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 w-[95%] max-w-md mx-auto">
        <label className="justify-self-start text-center text-3xl sm:text-4xl font-extrabold text-gray-900">
          Login to your account
        </label>

        <div className="sm:w-full sm:max-w-md sm:mx-auto ">
          <div className="bg-white py-8 px-4 sm:px-10 shadow-lg sm:rounded-lg">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="grid gap-1 mb-8">
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

              <div className="grid gap-1 mb-8">
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

              <div className="text-sm font-bold mb-8">
                <a className="text-blue-500 cursor-pointer hover:text-blue-400 transition-all duration-200">
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Please wait...' : 'Submit'}
              </button>

              <p className="mt-8 font-bold text-sm">
                Not have any account?{' '}
                <span className="text-blue-500 hover:underline transition-all duration-200">
                  <Link href={'/signup'}>Sign up</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions()
  );
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
