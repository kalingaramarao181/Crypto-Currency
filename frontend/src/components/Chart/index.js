import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

const LChart = () => {
  const labels = [
    "15/5", "16/5", "17/5", "18/5", "19/5", "20/5", "21/5", "22/5", "23/5", "24/5", "25/5", "26/5", "27/5", "28/5", "29/5", "30/5", "31/5",
    "1/6", "2/6", "3/6", "4/6", "5/6", "6/6", "7/6", "8/6", "9/6", "10/6", "11/6", "12/6", "13/6"
  ];

  const dataPoints = [
    61569.1130057734, 66220.51831432826, 65260.879803346186, 67053.12326509564, 66912.61861403697, 66252.71259591613, 71430.29700215145, 
    70189.8358177002, 69181.20085677762, 67906.46534276106, 68539.91646552991, 69268.44558973772, 68508.83110875699, 69367.23871755725, 
    68316.63588049631, 67577.26558995963, 68372.49288434093, 67474.95483698409, 67704.32641811523, 67740.01690222476, 68808.29368590549, 
    70600.01116676089, 71184.59943059199, 70759.58819301432, 69325.36238847222, 69315.1041233966, 69654.16073760358, 69493.17760915738, 
    67329.15232724321, 68224.51967501991, 67032.13991875864
  ];

  const referenceDateIndex = labels.indexOf("12/6");
  const borderColor = [];
  const backgroundColor = [];

  for (let i = 0; i < dataPoints.length; i++) {
    if (i <= referenceDateIndex) {
      borderColor.push("#3a80e9"); // blue border color for data points before 12/6
      backgroundColor.push("rgba(58, 128, 233, 0.1)"); // blue background color for data points before 12/6
    } else if (dataPoints[i] > dataPoints[i - 1]) {
      borderColor.push("green"); // green border color if the value increased
      backgroundColor.push("rgba(0, 128, 0, 0.1)"); // green background color if the value increased
    } else {
      borderColor.push("red"); // red border color if the value decreased
      backgroundColor.push("rgba(255, 0, 0, 0.1)"); // red background color if the value decreased
    }
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Data",
        data: dataPoints,
        borderColor: context => borderColor[context.dataIndex],
        backgroundColor: context => backgroundColor[context.dataIndex],
        borderWidth: 1,
        fill: true,
        pointRadius: 0,
        tension: 0.25,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LChart;
