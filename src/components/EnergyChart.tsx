'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Energy Consumption Trends',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export default function EnergyChart() {
  const data = {
    labels,
    datasets: [
      {
        label: 'Solar Energy',
        data: labels.map(() => Math.random() * 1000),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Wind Energy',
        data: labels.map(() => Math.random() * 1000),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div className="p-4 bg-white/10 backdrop-blur-lg rounded-lg">
      <Line options={options} data={data} />
    </div>
  )
}
