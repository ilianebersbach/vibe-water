import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Cylinder, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface VibeCanProps {
  colorTop?: string
  colorBottom?: string
  scale?: number
  autoRotate?: boolean
  hovered?: boolean
}

export default function VibeCan({
  colorTop = '#C0392B',
  colorBottom = '#2980B9',
  scale = 1,
  autoRotate = true,
  hovered = false,
}: VibeCanProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    if (autoRotate) {
      groupRef.current.rotation.y += 0.005
    }
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.08
    if (hovered) {
      groupRef.current.rotation.y += 0.015
    }
  })

  const canTexture = new THREE.CanvasTexture(createCanCanvas(colorTop, colorBottom))

  return (
    <group ref={groupRef} scale={scale}>
      {/* Can body */}
      <mesh ref={meshRef} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 1.4, 64, 1, false]} />
        <meshStandardMaterial
          map={canTexture}
          metalness={0.8}
          roughness={0.15}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.38, 0.42, 0.05, 64]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Pull tab ring */}
      <mesh position={[0, 0.76, 0]}>
        <torusGeometry args={[0.12, 0.018, 12, 32]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Bottom cap */}
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.38, 0.42, 0.05, 64]} />
        <meshStandardMaterial color="#999999" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Glow ring when hovered */}
      {hovered && (
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 1.5, 64, 1, true]} />
          <meshBasicMaterial
            color={colorTop}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  )
}

function createCanCanvas(colorTop: string, colorBottom: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512)
  grad.addColorStop(0, colorTop)
  grad.addColorStop(0.35, blendColors(colorTop, colorBottom, 0.5))
  grad.addColorStop(1, colorBottom)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 512)

  // Light sheen
  const sheen = ctx.createLinearGradient(60, 0, 180, 512)
  sheen.addColorStop(0, 'rgba(255,255,255,0.18)')
  sheen.addColorStop(0.4, 'rgba(255,255,255,0)')
  sheen.addColorStop(1, 'rgba(0,0,0,0.15)')
  ctx.fillStyle = sheen
  ctx.fillRect(0, 0, 512, 512)

  // DRINK text
  ctx.fillStyle = 'rgba(255,255,255,0.65)'
  ctx.font = 'bold 22px Kanit, sans-serif'
  ctx.textAlign = 'center'
  ctx.letterSpacing = '6px'
  ctx.fillText('DRINK', 256, 150)

  // Big V
  ctx.font = 'bold 110px Kanit, sans-serif'
  ctx.textAlign = 'center'
  const vGrad = ctx.createLinearGradient(200, 160, 320, 280)
  vGrad.addColorStop(0, '#F39C12')
  vGrad.addColorStop(0.33, '#C0392B')
  vGrad.addColorStop(0.66, '#2980B9')
  vGrad.addColorStop(1, '#00D4FF')
  ctx.fillStyle = vGrad
  ctx.fillText('V', 256, 270)

  // VIBE WATER
  ctx.fillStyle = 'rgba(255,255,255,0.95)'
  ctx.font = 'bold 46px Kanit, sans-serif'
  ctx.letterSpacing = '4px'
  ctx.fillText('VIBE', 256, 330)
  ctx.font = 'bold 38px Kanit, sans-serif'
  ctx.fillText('WATER', 256, 375)

  // Tagline
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = '300 16px Kanit, sans-serif'
  ctx.letterSpacing = '2px'
  ctx.fillText('just water with a vibe', 256, 408)

  // 12 FL OZ
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.font = '300 13px Kanit, sans-serif'
  ctx.letterSpacing = '1px'
  ctx.fillText('12 FL OZ (355 mL)', 256, 460)

  // Condensation drops
  ctx.fillStyle = 'rgba(255,255,255,0.25)'
  const drops = [
    [80, 80, 2, 12], [140, 40, 1.5, 8], [320, 90, 2, 15],
    [400, 55, 1.5, 10], [460, 120, 2, 9], [50, 300, 1.5, 11],
    [430, 280, 2, 14], [200, 420, 1.5, 7],
  ]
  drops.forEach(([x, y, r, h]) => {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillRect(x - r / 2, y, r, h)
  })

  return canvas
}

function blendColors(c1: string, c2: string, ratio: number): string {
  const r1 = parseInt(c1.slice(1, 3), 16)
  const g1 = parseInt(c1.slice(3, 5), 16)
  const b1 = parseInt(c1.slice(5, 7), 16)
  const r2 = parseInt(c2.slice(1, 3), 16)
  const g2 = parseInt(c2.slice(3, 5), 16)
  const b2 = parseInt(c2.slice(5, 7), 16)
  const r = Math.round(r1 + (r2 - r1) * ratio)
  const g = Math.round(g1 + (g2 - g1) * ratio)
  const b = Math.round(b1 + (b2 - b1) * ratio)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
