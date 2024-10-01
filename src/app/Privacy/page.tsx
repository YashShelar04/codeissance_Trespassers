"use client";

import React, { useState } from "react";
import {
  Shield,
  Lock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Platform {
  name: string;
  icon: React.ElementType;
}

const platforms: Platform[] = [
  { name: "All Platforms", icon: Shield },
  { name: "Facebook", icon: Facebook },
  { name: "Twitter", icon: Twitter },
  { name: "Instagram", icon: Instagram },
  { name: "LinkedIn", icon: Linkedin },
];

interface SecurityMetric {
  name: string;
  score: string | boolean | null;
}

const initialSecurityMetrics: SecurityMetric[] = [
  { name: "Password Strength", score: null },
  { name: "Two-Factor Authentication", score: null },
  { name: "Anomaly Detection", score: null },
];

interface SecurityCheckProps {
  onUpdate: (parameter: string, result: string | boolean) => void;
  onPasswordCheck: () => void;
}

function SecurityCheck({ onUpdate, onPasswordCheck }: SecurityCheckProps) {
  const runCheck = (parameter: string) => {
    console.log(`Running check for ${parameter}`);
    if (parameter === "passwordstrength") {
      onPasswordCheck();
    } else {
      setTimeout(() => {
        const result = Math.random() > 0.5;
        onUpdate(parameter, result);
      }, 1000);
    }
  };

  return (
    <Card className="bg-gray-800 text-white border-none shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-purple-600 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security Check
        </CardTitle>
        <CardDescription className="text-gray-400">
          Run individual security checks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {initialSecurityMetrics.map((metric) => (
            <div
              key={metric.name}
              className="flex items-center justify-between"
            >
              <Label
                htmlFor={`check-${metric.name}`}
                className="text-sm font-medium text-gray-300"
              >
                {metric.name}
              </Label>
              <Button
                id={`check-${metric.name}`}
                onClick={() =>
                  runCheck(metric.name.toLowerCase().replace(/ /g, ""))
                }
                size="sm"
                className="bg-black-600 hover:bg-purple-600 text-white transition-colors duration-300"
              >
                Run Check
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function PrivacyAndSecurity() {
  const [selectedPlatform, setSelectedPlatform] =
    useState<string>("All Platforms");
  const [securityResults, setSecurityResults] = useState<SecurityMetric[]>(
    initialSecurityMetrics,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [metCriteria, setMetCriteria] = useState<string[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [previousPasswordScore, setPreviousPasswordScore] = useState(0);

  const handleSecurityCheck = (parameter: string, result: string | boolean) => {
    setSecurityResults((prev) =>
      prev.map((metric) =>
        metric.name.toLowerCase().replace(/ /g, "") === parameter
          ? { ...metric, score: result }
          : metric,
      ),
    );

    updateOverallScore(parameter, result);
  };

  const updateOverallScore = (parameter: string, result: string | boolean) => {
    let scoreIncrease = 0;

    if (parameter === "passwordstrength") {
      // Subtract the previous password score
      setOverallScore((prevScore) =>
        Math.max(prevScore - previousPasswordScore, 0),
      );

      if (result === "weak") scoreIncrease = 8;
      else if (result === "moderate") scoreIncrease = 18;
      else if (result === "strong") scoreIncrease = 23;

      // Update the previous password score for future checks
      setPreviousPasswordScore(scoreIncrease);
    } else {
      scoreIncrease = result ? 25 : 0;
    }

    setOverallScore((prevScore) => Math.min(prevScore + scoreIncrease, 100));
  };

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

  const handleModalClose = () => {
    setIsModalOpen(false);
    const strengthLabel = getStrengthLabel(strength);
    handleSecurityCheck("passwordstrength", strengthLabel.toLowerCase());
    setPassword("");
    setStrength(0);
    setSuggestions([]);
    setMetCriteria([]);
  };

  return (
    <div className="max-w-7xl bg-gray-900 text-white mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Privacy & Security
        </h1>
        <p className="text-gray-300 mt-2">
          Manage your accounts privacy and security settings
        </p>
      </header>

      <div className="mb-6">
        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-[200px] bg-gray-800 text-white border-gray-700">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            {platforms.map((platform) => (
              <SelectItem key={platform.name} value={platform.name}>
                <div className="flex items-center">
                  <platform.icon className="w-4 h-4 mr-2" />
                  {platform.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Container */}
        <div className="space-y-6">
          <SecurityCheck
            onUpdate={handleSecurityCheck}
            onPasswordCheck={() => setIsModalOpen(true)}
          />

          <Card className="bg-gray-800 text-white border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-blue-400 flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-gray-400">
                Enhance your account security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-300">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-gray-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300"
                  >
                    Enable
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-300">Login Alerts</p>
                    <p className="text-sm text-gray-400">
                      Get notified of new or unusual logins
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300"
                  >
                    Configure
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-gray-600 text-gray-300"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Container */}
        <div className="space-y-6">
          <Card className="bg-gray-800 text-white border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-purple-400 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Score
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your overall digital security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl font-bold text-purple-400">
                  {overallScore}%
                </span>
                <span className="text-yellow-400">
                  {overallScore < 50
                    ? "Needs Improvement"
                    : overallScore < 80
                      ? "Good"
                      : "Excellent"}
                </span>
              </div>
              <Progress value={overallScore} className="h-2 mb-4" />
              <div className="space-y-2">
                {securityResults.map((metric) => (
                  <div
                    key={metric.name}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-300">{metric.name}</span>
                    {metric.score === null ? (
                      <span className="text-sm text-gray-400">Not checked</span>
                    ) : metric.name === "Password Strength" ? (
                      <span
                        className={`text-sm ${
                          metric.score === "strong"
                            ? "text-green-400"
                            : metric.score === "moderate"
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        {typeof metric.score === "string" &&
                          metric.score.charAt(0).toUpperCase() +
                            metric.score.slice(1)}
                      </span>
                    ) : metric.score ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <X className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Password Strength Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>
              Check Password Strength for {selectedPlatform}
            </DialogTitle>
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
            <Button
              type="button"
              className="bg-green-400"
              onClick={handleModalClose}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
