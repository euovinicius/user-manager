import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },

  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role;
      token.cep = user.cep;
      token.city = user.city;
      token.state = user.state;
    }
    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.role = token.role as string;
      session.user.cep = token.cep as string | null;
      session.user.city = token.city as string | null;
      session.user.state = token.state as string | null;
    }
    return session;
  },
},


  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        // ✅ Agora retornando TUDO necessário para o token/session
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          cep: user.cep,
          city: user.city,
          state: user.state,
        };
      },
    }),
  ],
});
