import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import clientPromise from './app/lib/mongodb';
import { User } from './app/lib/definitions';
import * as bcrypt from 'bcrypt';

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db('recipes2go');
    const collection = db.collection('users');
    const user = await collection.findOne({ email: email });

    if (user)
      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        password: user.password,
      };
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, req) {
        let user = null;
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user?.password) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return user;
      },
    }),
  ],
});
