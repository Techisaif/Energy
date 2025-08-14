'use client'
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  )
}
