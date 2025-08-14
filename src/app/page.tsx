'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Dynamically import components to avoid SSR issues
const EnergyScene = dynamic(() => import('../components/EnergyScene'), { ssr: false });
const EnergyChart = dynamic(() => import('../components/EnergyChart'), { ssr: false });
const EnergyInfoGraphic = dynamic(() => import('../components/EnergyInfoGraphic'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      {/* Hero Section with 3D Visualization */}
      <section className="h-screen relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-5xl font-bold mb-4"
            >
              Energy Visualization Platform
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-gray-300 mb-8"
            >
              Welcome to the future of energy analytics
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-colors"
              onClick={() => document.getElementById('charts')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Data
            </motion.button>
          </div>
        </motion.div>
        
        {/* 3D Scene Background */}
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <EnergyScene />
          </Suspense>
        </div>
      </section>

      {/* Real-time Energy Flow Section */}
      <section className="min-h-screen p-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Real-time Energy Flow</h2>
            <div className="grid gap-8">
              <Suspense fallback={<div className="h-[400px] bg-black/30 backdrop-blur-lg rounded-lg animate-pulse" />}>
                <EnergyInfoGraphic />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Charts Section */}
      <section id="charts" className="min-h-screen p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black/20 backdrop-blur-sm" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Energy Consumption Analytics</h2>
            <div className="grid gap-8">
              <Suspense fallback={<div className="h-[400px] bg-black/30 backdrop-blur-lg rounded-lg animate-pulse" />}>
                <EnergyChart />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
