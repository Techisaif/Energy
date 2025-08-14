'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Topic {
  id: string
  title: string
  description: string
  keywords: string[]
}

const topics: Topic[] = [
  {
    id: 'fusion',
    title: 'Nuclear Fusion Technology',
    description: 'Understanding the future of clean energy through nuclear fusion.',
    keywords: ['tokamak', 'plasma', 'magnetic confinement', 'fusion reactor']
  },
  {
    id: 'smartgrid',
    title: 'Smart Grid Systems',
    description: 'How AI-powered grids are revolutionizing energy distribution.',
    keywords: ['distribution', 'automation', 'efficiency', 'real-time monitoring']
  },
  {
    id: 'storage',
    title: 'Energy Storage Solutions',
    description: 'Next-generation battery technologies and storage systems.',
    keywords: ['batteries', 'hydrogen', 'thermal storage', 'grid storage']
  }
]

export default function AIContentGenerator() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [content, setContent] = useState<string>('')
  const [generating, setGenerating] = useState(false)

  const generateContent = async (topic: Topic) => {
    setGenerating(true)
    setSelectedTopic(topic)

    try {
      // In a real implementation, this would call an API endpoint
      // For demo, we'll use placeholder content
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      
      setContent(`
        Understanding ${topic.title}

        ${topic.description}

        Key Aspects:
        ${topic.keywords.map(keyword => `• ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`).join('\n')}

        Latest Developments:
        - Advanced control systems for improved efficiency
        - Integration with renewable energy sources
        - Real-time monitoring and predictive maintenance
        - AI-powered optimization algorithms

        Future Implications:
        This technology represents a significant step forward in sustainable energy production,
        with potential applications across various industrial sectors. Recent advancements
        suggest a 40% improvement in efficiency compared to traditional systems.

        Learn more about specific components and implementation strategies in our
        technical documentation section.
      `.trim())
    } catch (error) {
      console.error('Error generating content:', error)
      setContent('Failed to generate content. Please try again.')
    }

    setGenerating(false)
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Select a Topic</h3>
        {topics.map((topic) => (
          <motion.button
            key={topic.id}
            onClick={() => generateContent(topic)}
            className={`w-full text-left p-4 rounded-lg transition-colors ${
              selectedTopic?.id === topic.id
                ? 'bg-blue-600 text-white'
                : 'bg-black/30 text-gray-300 hover:bg-blue-900/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h4 className="font-bold">{topic.title}</h4>
            <p className="text-sm opacity-80">{topic.description}</p>
          </motion.button>
        ))}
      </div>

      <div className="md:col-span-2">
        <div className="bg-black/30 backdrop-blur-lg rounded-lg p-6 h-full">
          {generating ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : content ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose prose-invert max-w-none"
            >
              <div className="whitespace-pre-line">{content}</div>
            </motion.div>
          ) : (
            <div className="text-center text-gray-500 h-full flex items-center justify-center">
              Select a topic to generate AI-powered content
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
