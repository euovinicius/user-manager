import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    cep: string | null;
    city: string | null;
    state: string | null;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      cep: string | null;
      city: string | null;
      state: string | null;
    };
  }
}
