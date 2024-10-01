import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface PasswordStrengthModalProps {
  platform: string;
}

export function PasswordStrengthModal({
  platform,
}: PasswordStrengthModalProps) {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [metCriteria, setMetCriteria] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const checkPasswordStrength = (pwd: string) => {
    let score = 0;
    const newSuggestions: string[] = [];
    const newMetCriteria: string[] = [];

    if (pwd.length >= 8) {
      score += 20;
      newMetCriteria.push("8+ characters");
    } else {
      newSuggestions.push("Use at least 8 characters");
    }

    if (pwd.length >= 12) {
      score += 20;
      newMetCriteria.push("12+ characters");
    } else {
      newSuggestions.push(
        "Consider using at least 12 characters for extra security",
      );
    }

    if (/[A-Z]/.test(pwd)) {
      score += 20;
      newMetCriteria.push("Uppercase letter");
    } else {
      newSuggestions.push("Include at least one uppercase letter");
    }

    if (/[0-9]/.test(pwd)) {
      score += 20;
      newMetCriteria.push("Number");
    } else {
      newSuggestions.push("Include at least one number");
    }

    if (/[^A-Za-z0-9]/.test(pwd)) {
      score += 20;
      newMetCriteria.push("Special character");
    } else {
      newSuggestions.push("Include at least one special character");
    }

    setStrength(score);
    setSuggestions(newSuggestions);
    setMetCriteria(newMetCriteria);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const getStrengthLabel = (score: number) => {
    if (score < 40) return "Weak";
    if (score < 70) return "Moderate";
    return "Strong";
  };

  const getStrengthColor = (score: number) => {
    if (score < 40) return "bg-red-500";
    if (score < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleClose = () => {
    setIsOpen(false);
    setPassword("");
    setStrength(0);
    setSuggestions([]);
    setMetCriteria([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Check Password Strength
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Check Password Strength for {platform}</DialogTitle>
          <DialogDescription>
            Enter your password to check its strength. We don't store your
            password.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Strength</Label>
            <div className="col-span-3">
              <Progress
                value={strength}
                className={`w-full ${getStrengthColor(strength)}`}
              />
              <p className="mt-2 text-sm">{getStrengthLabel(strength)}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right">
              <AlertCircle className="h-4 w-4" />
            </Label>
            <div className="col-span-3">
              <p className="text-sm font-medium mb-2">Password criteria:</p>
              <ul className="text-sm space-y-1">
                {[
                  "8+ characters",
                  "12+ characters",
                  "Uppercase letter",
                  "Number",
                  "Special character",
                ].map((criterion) => (
                  <li key={criterion} className="flex items-center">
                    {metCriteria.includes(criterion) ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    {criterion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {suggestions.length > 0 && (
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right">
                <AlertCircle className="h-4 w-4" />
              </Label>
              <div className="col-span-3">
                <p className="text-sm font-medium mb-2">
                  Suggestions for a stronger password:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" className="bg-green-400" onClick={handleClose}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
