"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  Lock,
  Settings,
  User,
  Users,
  Shield,
  Globe,
  CreditCard,
  Clock,
  AlertTriangle,
  ChevronRight,
  Menu,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PrivacyAndSecurity from "../Privacy/page";
import TrustedContacts from "../Trusted/page";
import ConnectedServices from "../Connected/page";
import Insights from "../Insights/page";
import LegacyPlanning from "../legacy/page";

const menuItems = [
  {
    icon: <Lock className="w-5 h-5" />,
    label: "Privacy & Security",
    color: "text-purple-400",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Trusted Contacts",
    color: "text-blue-400",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    label: "Connected Services",
    color: "text-green-400",
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    label: "Legacy Planning",
    color: "text-yellow-400",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Security and Usage Insights",
    color: "text-pink-400",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Overview",
    color: "text-gray-400",
  },
];

const websiteUsageData = {
  daily: [
    {
      name: "12AM",
      Facebook: 0.5,
      Twitter: 0.3,
      Instagram: 0.2,
      LinkedIn: 0.1,
    },
    { name: "6AM", Facebook: 1.0, Twitter: 0.7, Instagram: 0.5, LinkedIn: 0.2 },
    {
      name: "12PM",
      Facebook: 2.0,
      Twitter: 1.5,
      Instagram: 1.0,
      LinkedIn: 0.5,
    },
    { name: "6PM", Facebook: 2.5, Twitter: 2.0, Instagram: 1.5, LinkedIn: 0.7 },
    {
      name: "11PM",
      Facebook: 1.5,
      Twitter: 1.0,
      Instagram: 0.8,
      LinkedIn: 0.3,
    },
  ],
  weekly: [
    { name: "Mon", Facebook: 2.5, Twitter: 1.5, Instagram: 1, LinkedIn: 0.5 },
    { name: "Tue", Facebook: 3, Twitter: 2, Instagram: 1.5, LinkedIn: 1 },
    { name: "Wed", Facebook: 2, Twitter: 1, Instagram: 2, LinkedIn: 0.75 },
    {
      name: "Thu",
      Facebook: 2.75,
      Twitter: 1.75,
      Instagram: 1.25,
      LinkedIn: 0.5,
    },
    {
      name: "Fri",
      Facebook: 3.5,
      Twitter: 2.5,
      Instagram: 1.75,
      LinkedIn: 1.25,
    },
    { name: "Sat", Facebook: 4, Twitter: 3, Instagram: 2.5, LinkedIn: 1.5 },
    {
      name: "Sun",
      Facebook: 3.75,
      Twitter: 2.75,
      Instagram: 2.25,
      LinkedIn: 1,
    },
  ],
  monthly: [
    { name: "Week 1", Facebook: 15, Twitter: 10, Instagram: 8, LinkedIn: 5 },
    { name: "Week 2", Facebook: 18, Twitter: 12, Instagram: 10, LinkedIn: 6 },
    { name: "Week 3", Facebook: 20, Twitter: 15, Instagram: 12, LinkedIn: 8 },
    { name: "Week 4", Facebook: 22, Twitter: 18, Instagram: 15, LinkedIn: 10 },
  ],
};

const subscriptions = [
  { name: "Netflix", expiry: "2023-12-31" },
  { name: "Spotify", expiry: "2024-03-15" },
  { name: "Adobe Creative Cloud", expiry: "2023-11-30" },
];

const recentActivity = [
  { action: "Password changed", platform: "Google", time: "2 hours ago" },
  { action: "New login detected", platform: "Facebook", time: "5 hours ago" },
  {
    action: "Privacy settings updated",
    platform: "Twitter",
    time: "1 day ago",
  },
];

export default function Dashboard() {
  const [usageFilter, setUsageFilter] = useState("weekly");
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    if (activeFeature === "Privacy & Security") {
      return <PrivacyAndSecurity />;
    }
    if (activeFeature === "Trusted Contacts") {
      return <TrustedContacts />;
    }
    if (activeFeature === "Connected Services") {
      return <ConnectedServices />;
    }
    if (activeFeature === "Security and Usage Insights") {
      return <Insights />;
    }
    if (activeFeature === "Legacy Planning") {
      return <LegacyPlanning />;
    }

    return (
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Digital Footprint Dashboard
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Security Score */}
          <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-purple-400">
                Security Score
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your overall digital security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl font-bold text-purple-400">75%</span>
                <span className="text-green-400">Good</span>
              </div>
              <Progress value={75} className="h-2 bg-purple-900" />
            </CardContent>
          </Card>

          {/* Connected Accounts */}
          <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-blue-400">
                Connected Accounts
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage your linked services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Facebook", "Google", "Twitter"].map((account, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-300">{account}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-pink-400">
                Recent Activity
              </CardTitle>
              <CardDescription className="text-gray-400">
                Latest actions on your accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[120px]">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage
                        src={`/placeholder-${activity.platform.toLowerCase()}.svg`}
                        alt={activity.platform}
                      />
                      <AvatarFallback>{activity.platform[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-gray-300">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Website Usage */}
        <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-indigo-400">
              Website Usage
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your activity across social platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Select value={usageFilter} onValueChange={setUsageFilter}>
                <SelectTrigger className="w-[120px] bg-gray-700 text-gray-200">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-gray-200">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={websiteUsageData[usageFilter]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="name" stroke="#a0aec0" />
                <YAxis stroke="#a0aec0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2d3748",
                    border: "none",
                    color: "#e2e8f0",
                  }}
                />
                <Line type="monotone" dataKey="Facebook" stroke="#4299e1" />
                <Line type="monotone" dataKey="Twitter" stroke="#48bb78" />
                <Line type="monotone" dataKey="Instagram" stroke="#ed64a6" />
                <Line type="monotone" dataKey="LinkedIn" stroke="#9f7aea" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscriptions */}
        <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-green-400">
              Subscriptions
            </CardTitle>
            <CardDescription className="text-gray-400">
              Track your service renewals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[120px]">
              {subscriptions.map((subscription, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-2"
                >
                  <span className="text-gray-300">{subscription.name}</span>
                  <span className="text-gray-500 text-sm">
                    Exp: {subscription.expiry}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-full bg-gray-800 shadow-lg z-20 ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 ease-in-out`}
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            <h1
              className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 ${isSidebarOpen ? "block" : "hidden"}`}
            >
              LegacyLink
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-full hover:bg-gray-700"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <ScrollArea className="flex-grow">
            <nav className="space-y-2 p-4">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full justify-start hover:bg-gray-700 transition-colors ${
                    activeFeature === item.label ? "bg-gray-700" : ""
                  }`}
                  onClick={() => setActiveFeature(item.label)}
                >
                  <div className={`${item.color} mr-2`}>{item.icon}</div>
                  <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    {item.label}
                  </span>
                </Button>
              ))}
            </nav>
          </ScrollArea>
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className={`${isSidebarOpen ? "block" : "hidden"}`}>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-400">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div
        className={`flex-1 overflow-y-auto ${isSidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300 ease-in-out`}
      >
        <div className="min-h-screen bg-gray-900 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
