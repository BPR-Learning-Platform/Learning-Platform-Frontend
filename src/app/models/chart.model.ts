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
      fill: 'origin',
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      fill: 'origin',
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
      fill: 'origin',
      hidden: true,
    },
    {
      data: initialArray,
      label: '',
      backgroundColor: 'transparent',
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
