import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const IncomeByEventChart = () => {
  const options = {
    chart: {
      type: 'column' // vertical bar chart
    },
    title: {
      text: 'Income by Events'
    },
    xAxis: {
      categories: ['Tech Talk', 'Hackathon', 'Workshop', 'Seminar', 'Webinar'],
      title: {
        text: 'Events'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Income (USD)'
      }
    },
    tooltip: {
      valuePrefix: '₹',
      valueSuffix: 'rs'
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: '₹{y}'
        }
      },
      series: {
        colorByPoint: true // enable color per bar
      }
    },
    series: [{
      name: 'Income',
      data: [
        { name: 'Tech Talk', y: 5000, color: '#FF6384' },
        { name: 'Hackathon', y: 3000, color: '#36A2EB' },
        { name: 'Workshop', y: 1500, color: '#36A2EB' },
        { name: 'Seminar', y: 2000, color: '#FFCD56' },
        { name: 'Webinar', y: 1000, color: '#4BC0C0' }
      ]
    }],
    credits: {
      enabled: false
    }
  };

  return (
    <div className="scale-90">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default IncomeByEventChart;
