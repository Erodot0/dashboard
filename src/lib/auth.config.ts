import { NextAuthConfig } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { db } from './pocketbase';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          const result = await db.authenticate(email, password);

          if (result?.token) {
            return {
              id: result.record.id as string,
              name: result.record.name as string,
              email: result.record.email as string,
              token: result.token
            };
          }
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    }
  ],
  pages: {
    signIn: '/' // sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.token = token.token as string;
      }
      return session;
    }
  }
} satisfies NextAuthConfig;

export default authConfig;
