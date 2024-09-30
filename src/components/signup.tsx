"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spline from "@splinetool/react-spline";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false); // Added to control form visibility
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate user registration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Account created successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      {/* Left side - Spline 3D Model */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Hc640F8jNo8bu9G6/scene.splinecode" />
      </div>

      {/* Right side - Signup Form */}
      <div className="relative z-10 flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="mx-auto w-full max-w-sm space-y-6 bg-white bg-opacity-30 backdrop-blur-md rounded-lg border border-gray-300 shadow-lg p-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
            <p className="text-muted-foreground">
              Choose how you want to create an account
            </p>
          </div>

          {/* Initial Choice between Google Sign-Up and Email Sign-Up */}
          {!showForm ? (
            <div className="space-y-4">
              <Button
                className="w-full"
                onClick={() => signIn("google")}
                disabled={isLoading}
              >
                Sign Up with Google
              </Button>
              <Button
                className="w-full mt-4"
                variant="secondary"
                onClick={() => setShowForm(true)}
                disabled={isLoading}
              >
                Sign Up with Email
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" required type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  type="password"
                />
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
              </Button>
              <div className="text-center">
                <Button
                  className="w-full mt-4"
                  onClick={() => signIn("google")}
                  disabled={isLoading}
                >
                  Sign Up with Google
                </Button>
              </div>
            </form>
          )}

          {/* Link to Login page */}
          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:underline"
            >
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
