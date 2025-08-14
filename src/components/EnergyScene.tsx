'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Points, PointMaterial } from '@react-three/drei'

function ParticleField() {
  const points = useRef()
  const particleCount = 5000
  
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    points.current.rotation.x = time * 0.1
    points.current.rotation.y = time * 0.15
  })

  return (
    <Points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#88ccff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

function CoreReactor() {
  const core = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    core.current.rotation.y = time * 0.2
    core.current.scale.x = 1 + Math.sin(time) * 0.2
    core.current.scale.y = 1 + Math.sin(time) * 0.2
    core.current.scale.z = 1 + Math.sin(time) * 0.2
  })

  return (
    <mesh ref={core}>
      <torusGeometry args={[1, 0.3, 16, 32]} />
      <meshPhongMaterial
        color="#4488ff"
        emissive="#1133ff"
        shininess={100}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

export default function EnergyScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <fog attach="fog" args={['#000', 5, 15]} />
      
      <ParticleField />
      <CoreReactor />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}
