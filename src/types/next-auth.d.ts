import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    userId: string;
    role: string;
  }
  interface Session {
    user: User & {
      userId: string;
      role: string;
    };
    token: {
      userId: string;
      role: string;
    };
  }
}
