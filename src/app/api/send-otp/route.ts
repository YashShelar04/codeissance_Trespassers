import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
const otps: { [email: string]: { otp: string; expiresAt: number } } = {}; // Store OTP temporarily

export async function POST(request: Request) {
  const { email } = await request.json();
  console.log(email);

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Send OTP email using Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "devdeepagnihotri@gmail.com", // Environment variables for email credentials
      pass: "Dragon@04",
    },
  });

  const mailOptions = {
    from: "devdeepagnihotri@gmail.com",
    to: "ydshelar04@gmail.com",
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);

    // Save OTP with expiration (5 minutes)
    otps[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error); // Log the error to the console
    return NextResponse.json(
      { message: "Failed to send OTP", error: error.message }, // Return error message
      { status: 500 },
    );
  }
}
