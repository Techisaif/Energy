'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Mesh, Points, PointsMaterial } from 'three'

interface TechModelProps {
  modelUrl: string
  isHovered: boolean
}

function Model({ url, isHovered }: { url: string, isHovered: boolean }) {
  const modelRef = useRef<Mesh>(null)
  const gltf = useLoader(GLTFLoader, url)

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
      if (isHovered) {
        modelRef.current.scale.x = 1.1 + Math.sin(state.clock.getElapsedTime()) * 0.1
        modelRef.current.scale.y = 1.1 + Math.sin(state.clock.getElapsedTime()) * 0.1
        modelRef.current.scale.z = 1.1 + Math.sin(state.clock.getElapsedTime()) * 0.1
      } else {
        modelRef.current.scale.set(1, 1, 1)
      }
    }
  })

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={[0, 0, 0]}
      scale={1}
    />
  )
}

function ParticleEffect({ isHovered }: { isHovered: boolean }) {
  const particlesRef = useRef<Points>(null)
  const count = 1000
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame((state) => {
    if (particlesRef.current && isHovered) {
      particlesRef.current.rotation.x += 0.001
      particlesRef.current.rotation.y += 0.002
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#4488ff"
        transparent
        opacity={isHovered ? 0.8 : 0.3}
      />
    </points>
  )
}

export default function TechModel({ modelUrl, isHovered }: TechModelProps) {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Model url={modelUrl} isHovered={isHovered} />
      <ParticleEffect isHovered={isHovered} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!isHovered}
        autoRotateSpeed={2}
      />
    </Canvas>
  )
}
