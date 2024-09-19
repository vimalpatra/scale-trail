import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { ROUTES } from '@/constants/routes';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: ROUTES.HOME,
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return ROUTES.DASHBOARD;
    },
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
