'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import * as tf from '@tensorflow/tfjs'

interface Prediction {
  type: string
  value: number
  trend: 'up' | 'down' | 'stable'
  confidence: number
}

interface Insight {
  title: string
  description: string
  predictions: Prediction[]
  timestamp: string
}

export default function AIInsights() {
  const [model, setModel] = useState<tf.LayersModel | null>(null)
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadModel() {
      try {
        // Load a pre-trained model (you'll need to create and save this)
        const loadedModel = await tf.loadLayersModel('/models/energy_predictor/model.json')
        setModel(loadedModel)
        generateInsights(loadedModel)
      } catch (error) {
        console.error('Error loading model:', error)
        // Fallback to dummy data for demo
        generateDummyInsights()
      }
    }

    loadModel()
  }, [])

  const generateDummyInsights = () => {
    const dummyInsights: Insight[] = [
      {
        title: 'Solar Energy Trend',
        description: 'AI predicts a 25% increase in solar energy production over the next 24 hours based on weather patterns.',
        predictions: [
          { type: 'Production', value: 125, trend: 'up', confidence: 0.89 },
          { type: 'Efficiency', value: 98, trend: 'stable', confidence: 0.95 }
        ],
        timestamp: new Date().toISOString()
      },
      {
        title: 'Grid Optimization',
        description: 'Smart grid AI suggests redistributing 15% of power flow to optimize transmission efficiency.',
        predictions: [
          { type: 'Optimization', value: 15, trend: 'up', confidence: 0.92 },
          { type: 'Loss Reduction', value: 30, trend: 'down', confidence: 0.88 }
        ],
        timestamp: new Date().toISOString()
      }
    ]
    setInsights(dummyInsights)
    setLoading(false)
  }

  const generateInsights = async (loadedModel: tf.LayersModel) => {
    try {
      // Example: Make predictions using the model
      const input = tf.tensor2d([[/* your input data */]])
      const prediction = loadedModel.predict(input) as tf.Tensor
      
      // Process predictions and create insights
      // This is where you'd implement your actual prediction logic
      
      // For now, fall back to dummy data
      generateDummyInsights()
    } catch (error) {
      console.error('Error generating insights:', error)
      generateDummyInsights()
    }
  }

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-500'
      case 'down': return 'text-red-500'
      default: return 'text-blue-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {insights.map((insight, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-black/30 backdrop-blur-lg rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-white mb-3">{insight.title}</h3>
          <p className="text-gray-300 mb-4">{insight.description}</p>
          
          <div className="space-y-4">
            {insight.predictions.map((prediction, pIndex) => (
              <div key={pIndex} className="flex items-center justify-between">
                <span className="text-gray-400">{prediction.type}</span>
                <div className="flex items-center space-x-2">
                  <span className={getTrendColor(prediction.trend)}>
                    {prediction.value}%
                  </span>
                  <div className="text-xs bg-blue-900/30 rounded px-2 py-1">
                    {(prediction.confidence * 100).toFixed(0)}% confidence
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Last updated: {new Date(insight.timestamp).toLocaleString()}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
