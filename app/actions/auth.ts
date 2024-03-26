'use server';

import { signIn, signOut as signOutFn } from '@/auth';
import { AuthError } from 'next-auth';
import { User } from '@/app/types';
import { prisma } from '@/prismaClient';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    if (formData.has('provider')) {
      const provider = formData.get('provider') as string;
      await signIn(provider, { callbackUrl: '/expenses' });
    } else {
      await signIn('credentials', formData);
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOut() {
  await signOutFn();
}

export async function getOrCreateUser(sessionUser: any) {
  try {
    const { name, email } = sessionUser;
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const newUser = { name, email };
      user = await prisma.user.create({
        data: newUser,
      });
    }
    return user as User;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch or create use.');
  }
}
