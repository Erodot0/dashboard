import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name?: string;
    email?: string;
    token?: string; // Add the `token` property
  }

  interface Session {
    user: User;
  }
}
