'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const TechModel = dynamic(() => import('./TechModel'), { ssr: false })

const technologies = [
  {
    id: 'fusion',
    name: 'Fusion Reactor',
    description: 'Next-generation clean energy through nuclear fusion, replicating the power of stars.',
    modelUrl: '/models/fusion-reactor.glb',
    stats: {
      efficiency: '95%',
      output: '2 GW',
      sustainability: '100%'
    }
  },
  {
    id: 'smartgrid',
    name: 'Smart Grid Network',
    description: 'AI-powered distribution network optimizing energy flow in real-time.',
    modelUrl: '/models/smart-grid.glb',
    stats: {
      efficiency: '99%',
      coverage: 'Global',
      adaptability: 'Real-time'
    }
  },
  // Add more technologies here
]

export default function TechShowcase() {
  const [activeTech, setActiveTech] = useState(technologies[0])
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-900/20 to-black/20 backdrop-blur-sm p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-white mb-12">Future Technologies</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Model Viewer */}
          <motion.div 
            className="relative aspect-square bg-black/30 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <TechModel modelUrl={activeTech.modelUrl} isHovered={isHovered} />
          </motion.div>

          {/* Tech Information */}
          <div className="space-y-8">
            <motion.div
              layout
              className="bg-black/30 rounded-lg p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{activeTech.name}</h3>
              <p className="text-gray-300 mb-6">{activeTech.description}</p>
              
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(activeTech.stats).map(([key, value]) => (
                  <motion.div 
                    key={key}
                    className="bg-blue-900/30 rounded-lg p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-blue-300 text-sm uppercase">{key}</p>
                    <p className="text-white font-bold">{value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tech Selection */}
            <div className="grid grid-cols-2 gap-4">
              {technologies.map((tech) => (
                <motion.button
                  key={tech.id}
                  className={`p-4 rounded-lg transition-colors ${
                    activeTech.id === tech.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-black/30 text-gray-300 hover:bg-blue-900/30'
                  }`}
                  onClick={() => setActiveTech(tech)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tech.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
