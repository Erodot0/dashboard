import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name?: string;
    email?: string;
    token?: string; // Add the `token` property
    isAdmin?: boolean;
  }

  interface Session {
    user: User;
  }
  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
