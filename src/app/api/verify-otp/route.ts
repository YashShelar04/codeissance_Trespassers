import { NextResponse } from "next/server";

const otps: { [email: string]: { otp: string; expiresAt: number } } = {}; // Use the same object

export async function POST(request: Request) {
  const { email, otp } = await request.json();

  if (!email || !otp) {
    return NextResponse.json(
      { message: "Email and OTP are required" },
      { status: 400 },
    );
  }

  const storedOtp = otps[email];

  if (!storedOtp) {
    return NextResponse.json(
      { message: "OTP not found or expired" },
      { status: 400 },
    );
  }

  if (storedOtp.otp === otp && Date.now() < storedOtp.expiresAt) {
    // OTP is correct
    delete otps[email]; // Remove OTP after verification
    return NextResponse.json({ message: "OTP verified successfully" });
  }

  return NextResponse.json(
    { message: "Invalid or expired OTP" },
    { status: 400 },
  );
}
