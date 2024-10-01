"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Spline from "@splinetool/react-spline";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import Link from "next/link";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase"; // Ensure this path is correct
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPageComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log({ res });
      toast.success("Logged in successfully");

      // Optionally, set session storage
      sessionStorage.setItem("user", "true");

      router.push("/dashboard"); // Or redirect to homepage ("/")
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/iFGbWEqvFex1PypX/scene.splinecode" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-8"
      >
        <div
          className="w-full space-y-6 p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold text-black">Welcome Back</h1>
            <p className="text-black/80">Sign in to your account</p>
          </div>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSignIn}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  className="pl-10 bg-white/20 border-white/30 text-black placeholder-white/50 rounded-full focus:ring-purple-500 focus:border-purple-500"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/50 w-5 h-5" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  type="password"
                  className="pl-10 bg-white/20 border-white/30 text-black placeholder-white/50 rounded-full focus:ring-purple-500 focus:border-purple-500"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/50 w-5 h-5" />
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 rounded-full py-6 text-lg font-semibold flex items-center justify-center space-x-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </motion.form>

          <div className="text-center mt-6">
            <p className="text-black/80">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-800 hover:underline font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
