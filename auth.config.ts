import type { NextAuthConfig, User } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isBudgetPage = nextUrl.pathname.startsWith('/budgets');
      const isExpensePage = nextUrl.pathname.startsWith('/expense');
      if (isBudgetPage || isExpensePage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/budgets/current', nextUrl));
      }
      return true;
    },
    async session({ session, token }) {
      session.user.id = (token.user as User)?.id || '';

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
