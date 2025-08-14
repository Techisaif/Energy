'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export default function EnergyScene() {
  const groupRef = useRef()

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <group ref={groupRef}>
        {/* Create a grid of animated spheres */}
        {Array.from({ length: 50 }).map((_, i) => {
          const x = (i % 10 - 5) * 1.5
          const y = (Math.floor(i / 10) - 2) * 1.5
          return (
            <Sphere key={i} position={[x, y, 0]} args={[0.3, 16, 16]}>
              <meshStandardMaterial
                color={new THREE.Color(0.5 + Math.random() * 0.5, 0.5, 1)}
                metalness={0.5}
                roughness={0.3}
              />
            </Sphere>
          )
        })}
      </group>

      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
