import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { fetchTimeSpentData } from "../../Chrome_Extension (1)/worker"; // Adjust the path accordingly

// Register Chart.js components
Chart.register(...registerables);

interface TimeSpentChartProps {
  userId: string; // Expecting userId as a prop
}

const TimeSpentChart: React.FC<TimeSpentChartProps> = ({ userId }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const createChart = async () => {
      const data = await fetchTimeSpentData(userId);
      const websites: Record<string, number> = {};

      data.forEach((log) => {
        if (!websites[log.url]) {
          websites[log.url] = 0;
        }
        websites[log.url] += log.duration;
      });

      const labels = Object.keys(websites);
      const values = Object.values(websites).map(
        (duration) => duration / (60 * 60 * 1000) // Convert to hours
      );

      const ctx = chartRef.current?.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Hours Spent",
                data: values,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Hours",
                },
              },
            },
          },
        });
      }
    };

    createChart();
  }, [userId]);

  return <canvas ref={chartRef} id="timeSpentChart" />;
};

export default TimeSpentChart;
