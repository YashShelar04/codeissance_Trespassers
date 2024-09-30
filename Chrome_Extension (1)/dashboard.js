import { fetchTimeSpentData } from "./worker.js";

async function createTimeSpentChart() {
  const userId = "REPLACE_WITH_USER_ID"; // You'll need to implement user authentication
  const data = await fetchTimeSpentData(userId);

  const websites = {};
  data.forEach((log) => {
    if (!websites[log.url]) {
      websites[log.url] = 0;
    }
    websites[log.url] += log.duration;
  });

  const labels = Object.keys(websites);
  const values = Object.values(websites).map(
    (duration) => duration / (60 * 60 * 1000)
  ); // Convert to hours

  const ctx = document.getElementById("timeSpentChart").getContext("2d");
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

createTimeSpentChart();
