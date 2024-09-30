// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Import Google provider

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Implement user authentication logic here (e.g., check against a database)
        if (
          credentials.email === "test@example.com" &&
          credentials.password === "password"
        ) {
          return { id: 1, name: "Test User", email: "test@example.com" };
        }
        return null; // Invalid credentials
      },
    }),
    GoogleProvider({
      clientId:
        "377766649384-2l8o57g0gq6ubnuejfs1c5g4n63l6alk.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
