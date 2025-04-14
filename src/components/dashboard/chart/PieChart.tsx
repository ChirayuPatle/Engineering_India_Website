import React from 'react';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = () => {
  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Manage Access'
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
        text: 'Number of Participants',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' participants'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      },
      innerSize:'50%',
      
    },
    series: [{
        name: 'Participants',
        colorByPoint: true,
        data: [
          { name: 'Admin', y: 2,color:"#FF5579" },
          { name: 'Volunteer', y: 3,color:"#FFC234" },
          { name: 'User', y: 1,color:"#36A2EB" },
          
        ]
      }],
    credits: {
      enabled: false
    }
  };

  return (
    <div className='scale-90'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
