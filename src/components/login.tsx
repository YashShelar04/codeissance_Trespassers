"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Spline from "@splinetool/react-spline";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link for navigation

export default function LoginPageComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false); // Control form visibility
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background">
      {/* Fullscreen Spline background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/iFGbWEqvFex1PypX/scene.splinecode" />
      </div>

      {/* Login form in the foreground */}
      <div className="relative z-10 w-full lg:w-1/3 p-8">
        <div
          className="mx-auto w-full max-w-md space-y-6 p-8 backdrop-blur-md bg-white/30 border border-white/30 shadow-lg rounded-xl"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(20px)",
            borderRadius: "16px",
          }}
        >
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Login</h1>
            <p className="text-white/80">Choose how you'd like to sign in</p>
          </div>

          {/* Initial choice between Google sign-in and Email/Password form */}
          {!showForm ? (
            <div className="space-y-4">
              <Button
                className="w-full"
                onClick={() => signIn("google")}
                disabled={isLoading}
              >
                Sign In with Google
              </Button>
              <Button
                className="w-full mt-4"
                variant="secondary"
                onClick={() => setShowForm(true)}
                disabled={isLoading}
              >
                Sign In with Email
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    type="email"
                    className="bg-white/50 text-white/80 border-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    required
                    type="password"
                    className="bg-white/50 text-white/80 border-white/30"
                  />
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </div>
            </form>
          )}

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-white/80">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
