import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // Ensure you import auto version for automatic registration

function LineChart({ chartData, multiAxis }) {
  const referenceDateIndex = chartData.labels.indexOf("9/6");
  const borderColor = [];
  const backgroundColor = [];

  // Determine colors for each data point
  for (let i = 0; i < chartData.datasets[0].data.length; i++) {
    if (i <= referenceDateIndex) {
      borderColor.push("#3a80e9"); // blue border color for data points before 12/6
      backgroundColor.push("rgba(58, 128, 233, 0.1)"); // blue background color for data points before 12/6
    } else if (i > referenceDateIndex && chartData.datasets[0].data[i] > chartData.datasets[0].data[i - 1]) {
      borderColor.push("green"); // green border color if the value increased
      backgroundColor.push("rgba(0, 128, 0, 0.1)"); // green background color if the value increased
    } else {
      borderColor.push("red"); // red border color if the value decreased
      backgroundColor.push("rgba(255, 0, 0, 0.1)"); // red background color if the value decreased
    }
  }

  // Clone chartData and assign new colors
  const updatedChartData = {
    ...chartData,
    datasets: [
      {
        ...chartData.datasets[0],
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      crypto1: {
        position: "left",
      },
      crypto2: multiAxis && {
        position: "right",
      },
    },
  };

  return <Line data={updatedChartData} options={options} />;
}

export default LineChart;
