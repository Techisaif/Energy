'use client'

import { useEffect, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Load Three.js components dynamically to avoid SSR issues
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
})

const EnergyChart = dynamic(() => import('@/components/EnergyChart'), {
  ssr: false,
})

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      const scrolled = window.scrollY
      const speed = 0.5
      scrollRef.current.style.transform = `translateY(${scrolled * speed}px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden">
        <div 
          ref={scrollRef}
          className="absolute inset-0 z-0"
        >
          <div className="w-full h-full">
            <Scene />
          </div>
        </div>
        
        <div className="relative z-10 pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold mb-6 gradient-text"
            >
              Future Energy Hub
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8"
            >
              Visualize and explore the future of sustainable energy through dynamic data visualization and AI-powered insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button className="btn-primary">
                Explore Data
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Showcase Section */}
      <section className="py-24 px-4 bg-black/90">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 gradient-text text-center">
            Advanced Technology Stack
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="tech-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-bold mb-3 text-blue-400">3D Visualization</h3>
              <p className="text-gray-400">Real-time 3D rendering of energy data using Three.js and WebGL technology.</p>
            </motion.div>

            <motion.div 
              className="tech-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-bold mb-3 text-blue-400">AI Analysis</h3>
              <p className="text-gray-400">Advanced machine learning models for predictive analytics and pattern recognition.</p>
            </motion.div>

            <motion.div 
              className="tech-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-bold mb-3 text-blue-400">Real-time Data</h3>
              <p className="text-gray-400">Live streaming of global energy metrics and sustainability indicators.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 gradient-text text-center">
            Interactive Dashboard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="dashboard-card">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Global Energy Consumption</h3>
              <EnergyChart type="consumption" />
            </div>
            
            <div className="dashboard-card">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">Renewable Energy Growth</h3>
              <EnergyChart type="renewable" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
