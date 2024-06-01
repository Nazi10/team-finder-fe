import type { User } from "next-auth/types";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ErrorType } from "./common/ErrorType";
import { env } from "process";

declare module "next-auth" {
  interface User {
    token: string;
    user: {
      userId: string;
      roles: string[];
    };
    status: "Ok" | "PasswordResetRequired";
  }
  interface JWT {
    accessToken: string;
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  secret: env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Username",
          type: "username",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${env.API_URL}/api/auth/signin`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
          method: "POST",
        });

        if (!res.ok) {
          const errors = (await res.json()) as ErrorType[];
          for (const e of errors) {
            throw new AuthError(e.message, {
              name: e.propertyName,
              cause: e.message,
            });
          }
        }
        const user = (await res.json()) as User;

        if (!user.token && !user?.user?.userId) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          user,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = (token.user as User) ?? session.user ?? {};
      session.user.token = token.accessToken as string;

      return session;
    },
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  debug: env.NODE_ENV === "development",
});
