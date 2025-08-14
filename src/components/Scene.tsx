'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import WindmillBackground from './WindmillBackground'
import { OrbitControls } from '@react-three/drei'

export default function Scene() {
  return (
    <div className="w-full h-screen absolute top-0 left-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ background: 'linear-gradient(to bottom, #1a365d, #2d3748)' }}
      >
        <Suspense fallback={null}>
          <WindmillBackground />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}
