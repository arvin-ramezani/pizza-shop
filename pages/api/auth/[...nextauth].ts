import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as bcryptjs from 'bcryptjs';

import { User } from '@/models/User';
import { signinSchema } from '@/utils/zod-validation/auth/auth.schema';
import dbConnect from '@/utils/db/dbConnect';

export default NextAuth({
  session: { strategy: 'jwt' },
  useSecureCookies:
    process.env.NODE_ENV && process.env.NODE_ENV === 'production',
  secret: process.env.JWT_SECRET,

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      // name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const isBodyValid = await signinSchema.isValid(credentials);
        if (!isBodyValid) {
          throw new Error('Invalid Inputs!');
        }

        await dbConnect();
        const existUser = await User.findOne({ email: credentials!.email });

        if (!existUser) {
          throw new Error('No user found!');
        }

        const isValidPassword = await bcryptjs.compare(
          credentials!.password,
          existUser!.password
        );
        if (!isValidPassword) {
          throw new Error('Invalid Password!');
        }

        console.log(existUser);

        return {
          email: existUser.email,
          id: existUser._id,
          name: existUser.firstName,
        };
      },
    }),
  ],
});
