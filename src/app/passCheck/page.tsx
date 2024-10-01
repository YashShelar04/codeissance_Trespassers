"use client";
import { PasswordStrengthModal } from "@/components/password-strength-modal";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Welcome to My Platform</h1>

      <p className="mb-4">
        Use the button below to check the strength of your password:
      </p>

      {/* Use PasswordStrengthModal component and pass the platform prop */}
      <PasswordStrengthModal platform="MyPlatform" />
    </div>
  );
}
