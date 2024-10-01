import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from "argon2"; // Correct import for argon2
import { db } from "@/lib/firebase"; // Firestore instance
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore methods

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "377766649384-2l8o57g0gq6ubnuejfs1c5g4n63l6alk.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // Create a reference to the users collection in Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", credentials.email));

        // Get the user document from Firestore
        const querySnapshot = await getDocs(q);
        const userDoc = querySnapshot.docs[0]; // Get the first user document

        if (userDoc) {
          const userData = userDoc.data();

          // Verify password using argon2 (async function)
          const isValid = await argon2.verify(
            userData.password,
            credentials.password,
          );

          if (isValid) {
            // Return the user object if password is valid
            return {
              id: userDoc.id,
              name: userData.name,
              email: userData.email,
            };
          }
        }

        // If user is not found or password is invalid, throw an error
        throw new Error("Invalid email or password");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token after sign-in
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties like access_token to the client
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
