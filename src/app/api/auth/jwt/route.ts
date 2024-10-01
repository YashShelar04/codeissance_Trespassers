// app/api/auth/jwt/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Define your secret key (preferably from environment variables)
const SECRET_KEY = "your-default-secret-key";

export async function POST(request: Request) {
  try {
    // Get the body content from the request
    const { email, uid } = await request.json();

    // Generate the JWT payload
    const payload = {
      email,
      uid,
    };

    // Sign the token with the secret key
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    // Return the token in the response
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
