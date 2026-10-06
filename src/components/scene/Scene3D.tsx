import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'

/**
 * Shared scroll state — updated by a window scroll listener, read inside useFrame.
 * progress: 0 → 1 across the whole page.
 */
export const scrollState = { progress: 0 }

export function updateScrollProgress() {
  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  scrollState.progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}

const STATION_DEPTH = 26
export const STATION_COUNT = 6
const TOTAL_DEPTH = STATION_DEPTH * (STATION_COUNT - 1)

const CYAN = '#68cbcb'
const BLUE = '#586596'
const AMBER = '#FFA639'

/* ------------------------------------------------------------------ */
/*  Camera rig: scroll-driven travel + mouse parallax                  */
/* ------------------------------------------------------------------ */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useMemo(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    if (!group.current) return
    const targetZ = scrollState.progress * TOTAL_DEPTH
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      targetZ,
      2.2,
      delta,
    )
    const cam = state.camera
    cam.position.x = THREE.MathUtils.damp(cam.position.x, pointer.current.x * 1.6, 2.4, delta)
    cam.position.y = THREE.MathUtils.damp(cam.position.y, pointer.current.y * 1.0, 2.4, delta)
    cam.lookAt(0, 0, cam.position.z - 12)
  })

  return <group ref={group}>{children}</group>
}

/* ------------------------------------------------------------------ */
/*  Station clusters — one per portfolio section                       */
/* ------------------------------------------------------------------ */

function HeroStation() {
  const knot = useRef<THREE.Mesh>(null)
  const shell = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (knot.current) {
      knot.current.rotation.x += delta * 0.18
      knot.current.rotation.y += delta * 0.24
    }
    if (shell.current) shell.current.rotation.y -= delta * 0.06
  })
  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh ref={shell}>
          <icosahedronGeometry args={[3.4, 1]} />
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.5} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.6}>
        <mesh ref={knot}>
          <torusKnotGeometry args={[1.15, 0.32, 140, 20]} />
          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={0.35}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      </Float>
      {[0, 1, 2, 3, 4].map((i) => (
        <Orbiter key={i} index={i} count={5} radius={5.4} size={0.16 + (i % 3) * 0.07} color={i % 2 ? BLUE : CYAN} speed={0.35} />
      ))}
    </group>
  )
}

function Orbiter({
  index,
  count,
  radius,
  size,
  color,
  speed,
  yAmp = 0.8,
}: {
  index: number
  count: number
  radius: number
  size: number
  color: string
  speed: number
  yAmp?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * speed + (index / count) * Math.PI * 2
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 1.7 + index) * yAmp,
      Math.sin(t) * radius,
    )
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
    </mesh>
  )
}

function AboutStation() {
  const cells: [number, number, number][] = []
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++) cells.push([x * 3.2, y * 2.4, (x + y) % 2 === 0 ? 0.9 : 0.55])
  return (
    <group>
      {cells.map(([x, y, s], i) => (
        <Float key={i} speed={1.2 + (i % 3) * 0.4} rotationIntensity={0.9} floatIntensity={1.4}>
          <mesh position={[x, y, 0]} rotation={[0.4 + i * 0.3, 0.6 + i * 0.5, 0]}>
            <octahedronGeometry args={[s, 0]} />
            <meshStandardMaterial
              color={BLUE}
              emissive={BLUE}
              emissiveIntensity={0.3}
              wireframe={i % 2 === 0}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function ExperienceStation() {
  const rings = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (rings.current) rings.current.rotation.z += delta * 0.15
  })
  return (
    <group ref={rings} rotation={[Math.PI / 2.6, 0.3, 0]}>
      {[0, 1, 2].map((i) => (
        <Float key={i} speed={1.1} rotationIntensity={0.3} floatIntensity={0.9}>
          <mesh position={[0, (i - 1) * 2.6, 0]}>
            <torusGeometry args={[3.4 - i * 0.5, 0.05, 12, 90]} />
            <meshStandardMaterial
              color={i === 1 ? CYAN : BLUE}
              emissive={i === 1 ? CYAN : BLUE}
              emissiveIntensity={0.7}
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function ProjectsStation() {
  const cubes = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (cubes.current) {
      cubes.current.rotation.y += delta * 0.2
      cubes.current.children.forEach((c, i) => {
        c.rotation.x += delta * (0.25 + i * 0.12)
        c.rotation.z += delta * 0.1
      })
    }
  })
  return (
    <group ref={cubes}>
      {[
        { p: [-3.6, 1.4, 0] as const, s: 1.25, c: CYAN },
        { p: [0.2, -0.8, -1.2] as const, s: 1.7, c: BLUE },
        { p: [3.8, 1.1, 0.6] as const, s: 1.05, c: AMBER },
      ].map((b, i) => (
        <Float key={i} speed={1.3} rotationIntensity={0.6} floatIntensity={1.2}>
          <mesh position={[b.p[0], b.p[1], b.p[2]]}>
            <boxGeometry args={[b.s, b.s, b.s]} />
            <meshStandardMaterial
              color={b.c}
              emissive={b.c}
              emissiveIntensity={0.28}
              metalness={0.75}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[b.p[0], b.p[1], b.p[2]]} scale={1.35}>
            <boxGeometry args={[b.s, b.s, b.s]} />
            <meshBasicMaterial color={b.c} wireframe transparent opacity={0.25} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function SkillsStation() {
  const core = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (core.current) core.current.rotation.y += delta * 0.3
  })
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.7, 0]} />
          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={0.5}
            metalness={0.85}
            roughness={0.2}
            flatShading
          />
        </mesh>
      </Float>
      {Array.from({ length: 8 }, (_, i) => (
        <Orbiter
          key={i}
          index={i}
          count={8}
          radius={4.4}
          size={i % 2 ? 0.34 : 0.22}
          color={[CYAN, BLUE, AMBER, '#d14444'][i % 4]}
          speed={0.28}
          yAmp={1.6}
        />
      ))}
    </group>
  )
}

function ContactStation() {
  const points = useMemo(() => {
    const arr = new Float32Array(1200 * 3)
    for (let i = 0; i < 1200; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = 3.2 + (Math.random() - 0.5) * 0.35
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.cos(phi)
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [])
  const cloud = useRef<THREE.Points>(null)
  useFrame((_, delta) => {
    if (cloud.current) cloud.current.rotation.y += delta * 0.08
  })
  return (
    <group>
      <points ref={cloud}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color={CYAN} size={0.035} transparent opacity={0.85} sizeAttenuation />
      </points>
      <mesh rotation={[0.6, 0.4, 0]}>
        <torusGeometry args={[4.6, 0.03, 12, 100]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */

function Station({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <group position={[index % 2 === 0 ? 0 : 2.2, index % 3 === 0 ? 0.4 : -0.3, -index * STATION_DEPTH]}>
      {children}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Error boundary — content must never blank because WebGL failed     */
/* ------------------------------------------------------------------ */
class SceneBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(err: unknown) {
    console.warn('[portfolio] 3D scene disabled:', err)
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

function StarfieldFallback() {
  return (
    <div
      className="fixed inset-0 z-0"
      aria-hidden
      style={{
        backgroundColor: '#05070a',
        backgroundImage: [
          'radial-gradient(1.5px 1.5px at 12% 22%, rgba(220,245,255,0.9), transparent)',
          'radial-gradient(1px 1px at 68% 12%, rgba(104,203,203,0.8), transparent)',
          'radial-gradient(1.5px 1.5px at 42% 68%, rgba(220,245,255,0.7), transparent)',
          'radial-gradient(1px 1px at 84% 54%, rgba(104,203,203,0.7), transparent)',
          'radial-gradient(2px 2px at 28% 86%, rgba(220,245,255,0.55), transparent)',
          'radial-gradient(1px 1px at 56% 38%, rgba(255,255,255,0.8), transparent)',
          'radial-gradient(1.5px 1.5px at 90% 82%, rgba(220,245,255,0.6), transparent)',
          'radial-gradient(1px 1px at 8% 56%, rgba(104,203,203,0.6), transparent)',
          'radial-gradient(circle at 50% 120%, rgba(88,101,150,0.25), transparent 55%)',
        ].join(','),
      }}
    />
  )
}

export default function Scene3D() {
  return (
    <SceneBoundary fallback={<StarfieldFallback />}>
      <div className="fixed inset-0 z-0" aria-hidden>
        <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.75]}
        camera={{ fov: 55, position: [0, 0, 10], near: 0.1, far: 220 }}
      >
        <color attach="background" args={['#05070a']} />
        <fog attach="fog" args={['#05070a', 10, 42]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[6, 6, 6]} intensity={60} color={CYAN} />
        <pointLight position={[-8, -4, -6]} intensity={40} color={BLUE} />
        <Stars radius={110} depth={70} count={2800} factor={4} saturation={0} fade speed={0.5} />
        <Rig>
          <Station index={0}><HeroStation /></Station>
          <Station index={1}><AboutStation /></Station>
          <Station index={2}><ExperienceStation /></Station>
          <Station index={3}><ProjectsStation /></Station>
          <Station index={4}><SkillsStation /></Station>
          <Station index={5}><ContactStation /></Station>
        </Rig>
      </Canvas>
      </div>
    </SceneBoundary>
  )
}
