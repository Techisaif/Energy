'use client'

import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="relative">
        {/* Hero Section */}
        <section className="min-h-screen relative overflow-hidden">
          
          <div className="relative z-10 pt-32 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 text-shadow-lg"
              >
                Future of Energy
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 max-w-2xl"
              >
                Explore the next generation of energy solutions through interactive visualizations and AI-powered insights.
              </motion.p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
