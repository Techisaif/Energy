'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function VoiceInteraction() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      // @ts-ignore
      const recognition = new webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = true

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('')
        
        setTranscript(transcript)
        processCommand(transcript.toLowerCase())
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [])

  const processCommand = (command: string) => {
    if (command.includes('show') || command.includes('display')) {
      if (command.includes('wind') || command.includes('turbine')) {
        // Trigger wind turbine view
        window.dispatchEvent(new CustomEvent('showTech', { detail: 'wind' }))
      } else if (command.includes('solar') || command.includes('panel')) {
        // Trigger solar panel view
        window.dispatchEvent(new CustomEvent('showTech', { detail: 'solar' }))
      } else if (command.includes('fusion') || command.includes('reactor')) {
        // Trigger fusion reactor view
        window.dispatchEvent(new CustomEvent('showTech', { detail: 'fusion' }))
      }
    }
  }

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        className={`rounded-full p-4 ${
          isListening ? 'bg-red-500' : 'bg-blue-600'
        } text-white shadow-lg`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={startListening}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </motion.button>
      {transcript && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-full mb-4 right-0 bg-white text-black p-4 rounded-lg shadow-lg max-w-xs"
        >
          {transcript}
        </motion.div>
      )}
    </div>
  )
}
