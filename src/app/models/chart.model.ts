import {ChartConfiguration} from "chart.js";

export function getWeekNumber(timeStamp: string): string{
  let currentDate = new Date(timeStamp);
  let startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days: number = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return "Week " + Math.ceil(days / 7);
}
let initialArray: [] = []
export const lineChartData: ChartConfiguration['data'] = {
  datasets: [
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      borderColor: '#0053a9',
      pointBackgroundColor: '#0083a1',
      fill: 'origin',
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      borderColor: '#ad0000',
      pointBackgroundColor: '#0083a1',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      borderColor: '#419d00',
      pointBackgroundColor: '#0083a1',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      borderColor: '#9b00ce',
      pointBackgroundColor: '#0083a1',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      borderColor: '#313030',
      pointBackgroundColor: '#0083a1',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      borderColor: '#09c6e3',
      pointBackgroundColor: '#31ab00',
      fill: 'origin',
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      borderColor: '#c76b00',
      pointBackgroundColor: '#31ab00',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      borderColor: '#b5d200',
      pointBackgroundColor: '#31ab00',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      borderColor: '#da63d3',
      pointBackgroundColor: '#31ab00',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      borderColor: '#858585',
      pointBackgroundColor: '#31ab00',
      fill: 'origin',
      hidden: true,
    }
  ],
  labels: initialArray,};

export const lineChartOptions: ChartConfiguration['options'] = {
  elements: {
    line: {
      tension: 0.2,
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Week'
      }
    },
    'y-axis-0':
      {
        suggestedMax: 4,
        suggestedMin: 0,
        beginAtZero: true,
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Score'
        }
      },
  },
  plugins: {
    legend: {
      onClick: (evt, legendItem, legend) => {
        legend.chart.data.datasets.forEach(dataset => {
          if (dataset.label?.includes(legendItem.text.substring(legendItem.text.length - 8, legendItem.text.length)))
            dataset.hidden = !dataset.hidden;
        });
        legend.chart.update();
      }}
  }
};
