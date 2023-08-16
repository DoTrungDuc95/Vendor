import axios from '@/axios';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, {
  NextAuthOptions,
  Session,
  SessionStrategy,
  User,
} from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

type NextAuthOptionsCallback = (
  req?: NextApiRequest,
  res?: NextApiResponse
) => NextAuthOptions;

export const authOptions: NextAuthOptionsCallback = (req, res) => ({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const user = await axios.post(
            '/login',
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            { withCredentials: true }
          );

          const cookie = user.headers['set-cookie'];

          res?.setHeader('Set-Cookie', cookie!);

          return user.data;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) token = { ...token, ...user };
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session) {
        const user = { ...session.user, ...token };
        session.user = user;
      }
      return session;
    },
  },
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions(req, res));
};
