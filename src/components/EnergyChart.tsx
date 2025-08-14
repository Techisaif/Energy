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
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface EnergyChartProps {
  type: 'consumption' | 'renewable'
}

export default function EnergyChart({ type }: EnergyChartProps) {
  // Sample data - replace with real data from your API
  const data = {
    consumption: {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
      datasets: [
        {
          label: 'Global Energy Consumption (TWh)',
          data: [157000, 165000, 170000, 168000, 172000, 175000],
          borderColor: 'rgb(99, 179, 237)',
          backgroundColor: 'rgba(99, 179, 237, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
    renewable: {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
      datasets: [
        {
          label: 'Renewable Energy Growth (%)',
          data: [27, 29, 32, 35, 38, 42],
          borderColor: 'rgb(72, 187, 120)',
          backgroundColor: 'rgba(72, 187, 120, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgb(156, 163, 175)',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgb(156, 163, 175)',
        bodyColor: 'rgb(156, 163, 175)',
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutCubic' as const,
    },
  }

  return (
    <div className="h-[300px] w-full">
      <Line data={data[type]} options={options} />
    </div>
  )
}
