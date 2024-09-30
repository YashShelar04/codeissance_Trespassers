'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Sample data for the graph
const dailyData = [
  { name: 'Mon', Facebook: 2, Twitter: 1, Instagram: 3, LinkedIn: 0.5 },
  { name: 'Tue', Facebook: 3, Twitter: 2, Instagram: 2, LinkedIn: 1 },
  { name: 'Wed', Facebook: 1, Twitter: 3, Instagram: 4, LinkedIn: 0.7 },
  { name: 'Thu', Facebook: 4, Twitter: 2, Instagram: 1, LinkedIn: 1.2 },
  { name: 'Fri', Facebook: 3, Twitter: 4, Instagram: 2, LinkedIn: 0.8 },
  { name: 'Sat', Facebook: 5, Twitter: 3, Instagram: 5, LinkedIn: 0.3 },
  { name: 'Sun', Facebook: 4, Twitter: 2, Instagram: 3, LinkedIn: 0.1 },
]

const weeklyData = [
  { name: 'Week 1', Facebook: 20, Twitter: 15, Instagram: 25, LinkedIn: 5 },
  { name: 'Week 2', Facebook: 25, Twitter: 18, Instagram: 22, LinkedIn: 7 },
  { name: 'Week 3', Facebook: 22, Twitter: 20, Instagram: 28, LinkedIn: 6 },
  { name: 'Week 4', Facebook: 30, Twitter: 25, Instagram: 20, LinkedIn: 8 },
]

const monthlyData = [
  { name: 'Jan', Facebook: 80, Twitter: 65, Instagram: 90, LinkedIn: 20 },
  { name: 'Feb', Facebook: 90, Twitter: 70, Instagram: 85, LinkedIn: 25 },
  { name: 'Mar', Facebook: 85, Twitter: 75, Instagram: 100, LinkedIn: 22 },
  { name: 'Apr', Facebook: 95, Twitter: 80, Instagram: 95, LinkedIn: 28 },
  { name: 'May', Facebook: 100, Twitter: 85, Instagram: 110, LinkedIn: 30 },
  { name: 'Jun', Facebook: 110, Twitter: 90, Instagram: 105, LinkedIn: 35 },
]

export function SocialMediaUsageGraphComponent() {
  const [timeFrame, setTimeFrame] = useState('daily')

  const getData = () => {
    switch (timeFrame) {
      case 'daily':
        return dailyData
      case 'weekly':
        return weeklyData
      case 'monthly':
        return monthlyData
      default:
        return dailyData
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Social Media Usage</CardTitle>
            <CardDescription>Track your time spent on various platforms</CardDescription>
          </div>
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={getData()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Facebook" stroke="#1877F2" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Twitter" stroke="#1DA1F2" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Instagram" stroke="#E4405F" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="LinkedIn" stroke="#0A66C2" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}