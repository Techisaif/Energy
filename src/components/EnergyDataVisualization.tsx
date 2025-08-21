'use client'

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

export default function EnergyDataVisualization() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/energy-data')
      const result = await response.json()
      setData(result.data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (loading) return <div>Loading energy data...</div>
  if (error) return <div>Error loading data: {error}</div>

  const chartData = {
    labels: data.map(d => d.timestamp),
    datasets: [
      {
        label: 'Energy Consumption',
        data: data.map(d => d.value),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Energy Data Trends'
      }
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Energy Data Visualization</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}
