"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Spline from "@splinetool/react-spline";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "react-toastify";
import { auth } from "@/lib/firebase"; // Ensure this path is correct
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log({ res });
      toast.success("Account created successfully");

      // Optional: Save user session if needed
      sessionStorage.setItem("user", "true");

      router.push("/dashboard"); // Redirect to dashboard after successful sign-up
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-purple-700 to-indigo-900">
      <div className="absolute inset-0 opacity-30">
        <Spline scene="https://prod.spline.design/Hc640F8jNo8bu9G6/scene.splinecode" />
      </div>

      <div className="relative z-10 flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md space-y-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-white border-opacity-20 shadow-2xl p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold text-white">Welcome</h1>
            <p className="text-lg text-gray-300">Create your account</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-white bg-opacity-20 border-white border-opacity-20 text-white placeholder-gray-300"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-white bg-opacity-20 border-white border-opacity-20 text-white placeholder-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-200">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="bg-white bg-opacity-20 border-white border-opacity-20 text-white placeholder-gray-300"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white transition duration-300 rounded-lg py-6 text-lg font-semibold shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-5 w-5" />
              )}
              Create Account
            </Button>
          </form>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-gray-300 hover:text-white transition duration-300"
            >
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
