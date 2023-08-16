import { GetServerSidePropsContext } from 'next';
import React from 'react';
import axios from '@/axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AxiosError } from 'axios';

type TokenProps = {
  user?: any;
  error?: string;
};

const Token = ({ user, error }: TokenProps) => {
  return (
    <section className="min-h-screen grid place-content-center">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-5">
          {error ? error : 'Your account has been activated successfully'}
        </h1>
        {user && (
          <p className="text-base">
            <span className="text-blue-500 font-bold hover:underline transition-all duration-200">
              <Link href="/login">Log in</Link>
            </span>{' '}
            or go to back{' '}
            <span className="font-bold hover:underline transition-all duration-200">
              <Link href="/">Home</Link>
            </span>
          </p>
        )}
        {error && (
          <p className="text-base">
            Back to{' '}
            <span className="font-bold hover:underline transition-all duration-200">
              <Link href="/">Home</Link>
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default Token;

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ token: string[] }>
) => {
  const { params } = context;
  const token = params?.token;

  try {
    const activeUser = await axios.post(
      '/active-account',
      { active_token: token![0] },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return {
      props: {
        user: activeUser.data,
      },
    };
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.data.message === 'jwt expired'
    ) {
      return {
        props: {
          error: 'Your account verification time has expired',
        },
      };
    }
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
