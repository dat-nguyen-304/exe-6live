import "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string;
    provider?: string;
    accessToken?: string;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken: string;
    provider: string;
    id_token: string;
  }
}
