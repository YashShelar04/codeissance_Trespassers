"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  BarChart,
  Bar,
} from "recharts";

interface UsageData {
  name: string;
  Facebook: number;
  Twitter: number;
  Instagram: number;
  LinkedIn: number;
}

interface ContentRatingData {
  x: number;
  y: number;
  z: number;
  name: string;
  color: string;
}

interface AlertNotification {
  id: number;
  title: string;
  message: string;
  severity: "high" | "medium" | "low";
}

const websiteUsageData: Record<string, UsageData[]> = {
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

const timeUsageData: Record<string, UsageData[]> = {
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

const contentRatingData: ContentRatingData[] = [
  { x: 20, y: 30, z: 10, name: "Explicit", color: "#ef4444" },
  { x: 50, y: 50, z: 20, name: "Neutral", color: "#3b82f6" },
  { x: 80, y: 70, z: 30, name: "Safe", color: "#22c55e" },
];

const alertNotifications: AlertNotification[] = [
  {
    id: 1,
    title: "Suspicious Login Attempt",
    message: "A login attempt from an unknown IP address was detected.",
    severity: "high",
  },
  {
    id: 2,
    title: "Weak Password Detected",
    message:
      "One of your passwords has been identified as weak. Please update it.",
    severity: "medium",
  },
  {
    id: 3,
    title: "Data Breach Alert",
    message:
      "A service you use has reported a data breach. Change your password immediately.",
    severity: "high",
  },
];

export default function SecurityAndUsageMonitoring() {
  const [usageFilter, setUsageFilter] = useState<
    "daily" | "weekly" | "monthly"
  >("weekly");
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "weekly",
  );

  return (
    <div className="max-w-7xl mx-auto bg-gray-900 text-gray-100 min-h-screen p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Security and Usage Monitoring
          </h1>
          <p className="text-gray-400 mt-2">
            Monitor your account security and usage patterns
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </header>
      <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow mb-6">
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
            <Select
              value={usageFilter}
              onValueChange={(value: "daily" | "weekly" | "monthly") =>
                setUsageFilter(value)
              }
            >
              <SelectTrigger className="w-[120px] bg-gray-700 text-gray-200 border-gray-600">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-gray-200 border-gray-600">
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={400}>
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
              <Legend />
              <Line type="monotone" dataKey="Facebook" stroke="#4299e1" />
              <Line type="monotone" dataKey="Twitter" stroke="#48bb78" />
              <Line type="monotone" dataKey="Instagram" stroke="#ed64a6" />
              <Line type="monotone" dataKey="LinkedIn" stroke="#9f7aea" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-indigo-400">
            Time Usage
          </CardTitle>
          <CardDescription className="text-gray-400">
            Your activity across platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Select
              value={timeRange}
              onValueChange={(value: "daily" | "weekly" | "monthly") =>
                setTimeRange(value)
              }
            >
              <SelectTrigger className="w-[180px] bg-gray-700 text-gray-200 border-gray-600">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-gray-200 border-gray-600">
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={timeUsageData[timeRange]}>
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
              <Legend />
              <Bar dataKey="Facebook" fill="#4299e1" />
              <Bar dataKey="Twitter" fill="#48bb78" />
              <Bar dataKey="Instagram" fill="#ed64a6" />
              <Bar dataKey="LinkedIn" fill="#9f7aea" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-green-400">
              Content Rating and Privacy Risk
            </CardTitle>
            <CardDescription className="text-gray-400">
              Analyze your content consumption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid stroke="#4a5568" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Privacy Risk"
                  unit="%"
                  label={{
                    value: "Privacy Risk (%)",
                    position: "insideBottom",
                    offset: -5,
                  }}
                  stroke="#a0aec0"
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Content Rating"
                  unit="%"
                  label={{
                    value: "Content Rating (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  stroke="#a0aec0"
                />
                <ZAxis
                  type="number"
                  dataKey="z"
                  range={[100, 1000]}
                  name="Volume"
                  unit="views"
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    backgroundColor: "#2d3748",
                    border: "none",
                    color: "#e2e8f0",
                  }}
                />
                <Legend />
                <Scatter
                  name="Content Types"
                  data={contentRatingData}
                  fill="#8884d8"
                >
                  {contentRatingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-yellow-400">
              Alert Notifications
            </CardTitle>
            <CardDescription className="text-gray-400">
              Recent security alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {alertNotifications.map((alert) => (
                <div key={alert.id} className="mb-4 p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-200">
                      {alert.title}
                    </h3>
                    <Badge
                      variant={
                        alert.severity === "high" ? "destructive" : "default"
                      }
                      className={
                        alert.severity === "high"
                          ? "bg-red-900 text-red-200"
                          : "bg-yellow-900 text-yellow-200"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">{alert.message}</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
