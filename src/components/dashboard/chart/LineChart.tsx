"use client"
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChart = () => {
  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Monthly User Login Trends - 2025'
    },
    xAxis: {
      title: { text: 'Month' },
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
    },
    yAxis: {
      title: {
        text: 'Number of Logins'
      },
      allowDecimals: false
    },
    tooltip: {
      valueSuffix: ' logins'
    },
    series: [{
      name: 'Users Logged In',
      data: [150, 200, 250, 300, 280, 350, 400, 370, 330, 390, 420, 450],
      color: '#0071A7'
    }],
    credits: {
      enabled: false
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };

  return (
    <div className='scale-95'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineChart;
