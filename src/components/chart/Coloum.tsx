"use client"
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ColumnChart = () => {
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Event-wise Registrations',
    },
    xAxis: {
      categories: ['Hackathon', 'Workshop', 'Webinar', 'Seminar'],
      crosshair: true,
      title: {
        text: 'Events'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'No. of Registrations',
      },
    },
    tooltip: {
      shared: true,
      valueSuffix: ' users'
    },
    plotOptions: {
      column: {
        borderWidth: 0
      }
    },
    series: [{
      name: 'Registrations',
      data: [120, 80, 95, 60],
      color: '#4f46e5' // Indigo Tailwind shade
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ColumnChart;
