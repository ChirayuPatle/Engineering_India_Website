"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineChart = () => {
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "New User Growth (Last 7 Days)",
    },
    xAxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      title: {
        text: "Days",
      },
    },
    yAxis: {
      title: {
        text: "No. of New Users",
      },
    },
    tooltip: {
      valueSuffix: " users",
    },
    series: [
      {
        name: "New Users",
        data: [12, 19, 8, 15, 25, 20, 30],
        color: "#10b981", // Tailwind green
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
