'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface EnergyData {
  solar: number
  wind: number
  hydro: number
}

const generateRandomData = (): EnergyData => ({
  solar: Math.random() * 100,
  wind: Math.random() * 100,
  hydro: Math.random() * 100,
})

export default function EnergyInfoGraphic() {
  const [data, setData] = useState<EnergyData>(generateRandomData())

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData())
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[400px] bg-black/30 backdrop-blur-lg rounded-lg p-6">
      <div className="grid grid-cols-3 gap-4 h-full">
        {Object.entries(data).map(([key, value], index) => (
          <motion.div
            key={key}
            className="flex flex-col items-center justify-end"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <motion.div
              className="w-full bg-blue-500/30 rounded-t-lg relative overflow-hidden"
              style={{ height: `${value}%` }}
            >
              <motion.div
                className="absolute bottom-0 w-full bg-blue-500"
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{
                  duration: 1,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
            <p className="mt-2 text-white capitalize">{key}</p>
            <p className="text-blue-300">{value.toFixed(1)}%</p>
          </motion.div>
        ))}
      </div>
      
      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <motion.path
          d="M 100,200 L 300,100 L 500,150"
          stroke="#4488ff"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  )
}
