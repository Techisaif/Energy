'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navigation() {
  const [activeTab, setActiveTab] = useState('home')

  const tabs = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'visualizations', label: 'Energy Visualizations', path: '/visualizations' },
    { id: 'chat', label: 'AI Chat', path: '/chat' },
    { id: 'analytics', label: 'Analytics', path: '/analytics' },
    { id: 'about', label: 'About', path: '/about' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-white text-xl font-bold">Energy Hub</span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {tabs.map((tab) => (
                  <Link
                    key={tab.id}
                    href={tab.path}
                    className="relative"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === tab.id ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}>
                      {tab.label}
                    </span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 h-0.5 bg-blue-500 bottom-0"
                        animate={{ opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
