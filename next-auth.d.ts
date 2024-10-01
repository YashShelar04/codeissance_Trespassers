// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

// Extend the session and token types
declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add the accessToken property to the session
  }

  interface JWT {
    accessToken?: string; // Add the accessToken property to the JWT token
  }
}
