import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const EventBarChart = () => {
  const options = {
    chart: {
      type: 'column' // ✅ This makes the bars vertical
    },
    title: {
      text: 'Events vs Registered Participants'
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
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><br>',
      pointFormat: '<b>{point.y} participants</b>', // Enhanced tooltip for more information
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        
        },
        borderRadius: 5, // Rounded corners for bars
        borderWidth: 1,
         // Border color for bars
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Participants',
      colorByPoint: true, // This ensures each column gets a different color
      data: [
        { y: 120, color: '#FFB1C1' }, // Custom color for Tech Talk
        { y: 200, color: '#9AD0F5' }, // Custom color for Hackathon
        { y: 150, color: '#FFE6AA' }, // Custom color for Workshop
        { y: 90, color: '#A5DFDF' },  // Custom color for Seminar
        { y: 160, color: '#CCB2FF' }  // Custom color for Webinar
      ]
    }]
  };

  return (
    <div className='scale-95'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default EventBarChart;
