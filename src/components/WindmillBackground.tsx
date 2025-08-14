'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'
import { useTexture } from '@react-three/drei'

export default function WindmillBackground() {
  const bladeRef = useRef<Group>(null)
  const poleRef = useRef<Mesh>(null)

  // Rotate the blades
  useFrame((state, delta) => {
    if (bladeRef.current) {
      bladeRef.current.rotation.z -= delta * 0.5 // Adjust speed by changing multiplier
    }
  })

  return (
    <group position={[0, 0, -5]}>
      {/* Windmill Pole */}
      <mesh ref={poleRef} position={[0, -2, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 4]} />
        <meshStandardMaterial color="#4a5568" roughness={0.7} />
      </mesh>

      {/* Windmill Blades */}
      <group ref={bladeRef} position={[0, 0, 0]}>
        {[0, 1, 2].map((blade) => (
          <mesh key={blade} rotation={[0, 0, (blade * Math.PI * 2) / 3]}>
            <boxGeometry args={[0.2, 3, 0.1]} />
            <meshStandardMaterial color="#2d3748" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        {/* Center Hub */}
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Background Plane */}
      <mesh position={[0, 0, -2]} rotation={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>

      {/* Lights */}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <ambientLight intensity={0.5} />
    </group>
  )
}
