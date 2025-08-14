'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined') {
      // First Contentful Paint
      const paintTiming = performance.getEntriesByType('paint')
      console.log('Paint Timing:', paintTiming)

      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        console.log('LCP:', entries[entries.length - 1])
      }).observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry) => {
          console.log('FID:', entry)
        })
      }).observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry) => {
          console.log('CLS:', entry)
        })
      }).observe({ entryTypes: ['layout-shift'] })
    }
  }, [])

  return null
}
