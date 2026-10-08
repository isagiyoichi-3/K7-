import React, { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'

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
// Deliberately uneven placement: every station sits clear of the centred
// headline column and arrives at a different height, depth and angle.
const STATION_X = [6.2, 4.8, 5.2, 4.6, 5.0, 5.6]
const STATION_Y = [0.2, 1.5, -1.7, 0.8, 1.9, -0.5]
const STATION_Z = [-6, -2, 0, -4, -2, 0]
const STATION_RY = [0.3, -0.28, 0.22, -0.32, 0.26, -0.2]

const WHITE = '#ffffff'
const GRAY = '#8f8f8f'
const DIM = '#d6d6d6'
const ICE = '#8fd0ff'
const AMBER = '#ffb454'

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
    const d = Math.min(delta, 1 / 30)
    const targetZ = scrollState.progress * TOTAL_DEPTH
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      targetZ,
      3.4,
      d,
    )
    const cam = state.camera
    cam.position.x = THREE.MathUtils.damp(cam.position.x, pointer.current.x * 0.9, 3.2, d)
    cam.position.y = THREE.MathUtils.damp(cam.position.y, pointer.current.y * 0.6, 3.2, d)
    cam.lookAt(0, 0, cam.position.z - 12)
  })

  return <group ref={group}>{children}</group>
}

/* ------------------------------------------------------------------ */
/*  Backbone — packet stream flowing the full depth of the scene       */
/* ------------------------------------------------------------------ */
const BACKBONE_COUNT = 150
const BACKBONE_SPAN = TOTAL_DEPTH + 70

function BackboneStream() {
  const ref = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const seeds = useMemo(() => {
    const arr = new Float32Array(BACKBONE_COUNT * 4)
    for (let i = 0; i < BACKBONE_COUNT; i++) {
      arr[i * 4] = Math.random() * BACKBONE_SPAN
      arr[i * 4 + 1] = Math.random() * Math.PI * 2
      arr[i * 4 + 2] = 5.6 + Math.random() * 3.4
      arr[i * 4 + 3] = 2.0 + Math.random() * 2.8
    }
    return arr
  }, [])

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return
    const c = new THREE.Color()
    for (let i = 0; i < BACKBONE_COUNT; i++) {
      const r = i % 10
      c.set(r < 6 ? WHITE : r < 9 ? ICE : AMBER)
      mesh.setColorAt(i, c)
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [])

  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh) return
    const t = clock.getElapsedTime()
    for (let i = 0; i < BACKBONE_COUNT; i++) {
      const p = (seeds[i * 4] + t * seeds[i * 4 + 3]) % BACKBONE_SPAN
      const a = seeds[i * 4 + 1] + t * 0.12
      const lane = i % 2 === 0 ? 1 : -1
      dummy.position.set(
        lane * (7.4 + Math.sin(a) * 1.6),
        -1.2 + Math.sin(a * 1.3) * 1.8,
        -TOTAL_DEPTH - 45 + p,
      )
      dummy.rotation.set(t * 0.6 + i, t * 0.4, 0)
      dummy.scale.setScalar(0.09 + (i % 3) * 0.045)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, BACKBONE_COUNT]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial transparent opacity={0.85} />
    </instancedMesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Station 0 — live service mesh: gateway, services, request pulses   */
/* ------------------------------------------------------------------ */
function ServiceMeshStation() {
  const group = useRef<THREE.Group>(null)
  const pulses = useRef<(THREE.Mesh | null)[]>([])
  const R = 4.2
  const NODES = 6

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (group.current) group.current.rotation.y = t * 0.1
    pulses.current.forEach((p, i) => {
      if (!p) return
      const k = (t * 0.3 + i / NODES) % 1
      const a = (i / NODES) * Math.PI * 2
      p.position.set(Math.cos(a) * R * k, Math.sin(k * Math.PI) * 0.7, Math.sin(a) * R * k)
      p.scale.setScalar(0.5 + Math.sin(k * Math.PI) * 1.1)
    })
  })

  const edges = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < NODES; i++) {
      const a = (i / NODES) * Math.PI * 2
      arr.push(0, 0, 0, Math.cos(a) * R, 0, Math.sin(a) * R)
    }
    return new Float32Array(arr)
  }, [])

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color={WHITE}
            emissive={WHITE}
            emissiveIntensity={0.65}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshBasicMaterial color={WHITE} wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={GRAY} transparent opacity={0.45} />
      </lineSegments>
      {Array.from({ length: NODES }, (_, i) => {
        const a = (i / NODES) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * R, 0, Math.sin(a) * R]} rotation={[0.4, a, 0.2]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
              color={DIM}
              emissive={DIM}
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        )
      })}
      {Array.from({ length: NODES }, (_, i) => (
        <mesh
          key={`p${i}`}
          ref={(el) => {
            pulses.current[i] = el
          }}
        >
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshBasicMaterial color={ICE} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Station 1 — floating 3D terminals streaming live logs              */
/* ------------------------------------------------------------------ */
const LOG_POOL = [
  '$ tail -f /var/log/platform/api.log',
  '[ok]   POST /api/pipelines       201  12ms',
  '[ok]   GET  /api/reports/agg     200  84ms',
  '[ok]   PUT  /api/config/schema   200  31ms',
  '[warn] pod-17 retry backoff=400ms',
  '[ok]   kafka lag=0 partition=3',
  '[ok]   jwt verify sub=dev-442',
  '$ kubectl rollout status gw',
  '[ok]   rerun failed-only → 0 fail',
  '[ok]   RAG index docs=1284',
  '[info] autoscale pods 33 → 36',
  '[ok]   GET  /health              200   2ms',
  '[ok]   tx commit shard=7 4ms',
  '$ curl -s api.vinod.dev/status',
]

function TerminalPanel({
  position,
  rotation,
  seed,
  pool = LOG_POOL,
  header = 'vinod@blr: ~/platform',
  lines = 11,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  seed: number
  pool?: string[]
  header?: string
  lines?: number
}) {
  const canvasH = 58 + lines * 24
  const canvas = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = canvasH
    return c
  }, [canvasH])
  const tex = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas)
    t.anisotropy = 4
    return t
  }, [canvas])
  const last = useRef(-1)

  useFrame(({ clock }) => {
    const tick = Math.floor(clock.getElapsedTime() * 2.2 + seed * 7)
    if (tick === last.current) return
    last.current = tick
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, 512, canvasH)
    ctx.fillStyle = '#1c1c1c'
    ctx.fillRect(0, 0, 512, 34)
    ctx.fillStyle = '#e5e5e5'
    ctx.font = '16px monospace'
    ctx.fillText(header, 14, 23)
    ctx.fillStyle = '#3d3d3d'
    ctx.fillRect(462, 12, 10, 10)
    ctx.fillRect(478, 12, 10, 10)
    ctx.fillRect(494, 12, 10, 10)
    ctx.font = '15px monospace'
    for (let i = 0; i < lines; i++) {
      const line = pool[(tick + i + seed * 3) % pool.length]
      ctx.fillStyle = line.startsWith('[warn]')
        ? '#ffb454'
        : line.startsWith('$')
          ? '#ffffff'
          : '#bfbfbf'
      ctx.fillText(line, 14, 62 + i * 24)
    }
    if (tick % 2 === 0) {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(14, 62 + lines * 24 - 14, 9, 18)
    }
    tex.needsUpdate = true
  })

  const frontH = (2.3 * canvasH) / 320
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[3.9, frontH + 0.15]} />
        <meshBasicMaterial color={WHITE} transparent opacity={0.12} />
      </mesh>
      <mesh>
        <planeGeometry args={[3.7, frontH]} />
        <meshBasicMaterial map={tex} transparent opacity={0.95} />
      </mesh>
    </group>
  )
}

function TerminalStation() {
  return (
    <group>
      <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.7}>
        <TerminalPanel position={[-0.4, 0.6, 0]} rotation={[0.05, -0.5, 0.02]} seed={0} />
      </Float>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.9}>
        <TerminalPanel position={[1.6, -1.2, -1.4]} rotation={[-0.04, -0.35, -0.02]} seed={5} />
      </Float>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Station 2 — CI loop rings + git commit graph                       */
/* ------------------------------------------------------------------ */
function CommitGraph() {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += Math.min(delta, 1 / 30) * 0.12
  })
  const trunk = useMemo(
    () => new Float32Array([-4, 0, 0, -1, 0, 0, -1, 0, 0, 2, 0, 0, 2, 0, 0, 4, 0, 0]),
    [],
  )
  const branchA = useMemo(
    () => new Float32Array([-1, 0, 0, 0, 1.1, 0, 0, 1.1, 0, 1, 1.1, 0, 1, 1.1, 0, 2, 0, 0]),
    [],
  )
  const branchB = useMemo(
    () => new Float32Array([0, 0, 0, 1, -1, 0, 1, -1, 0, 3.2, -1, 0]),
    [],
  )
  const commits: { p: [number, number, number]; c: string }[] = [
    { p: [-4, 0, 0], c: GRAY },
    { p: [-1, 0, 0], c: WHITE },
    { p: [0, 1.1, 0], c: ICE },
    { p: [1, 1.1, 0], c: ICE },
    { p: [2, 0, 0], c: WHITE },
    { p: [4, 0, 0], c: GRAY },
    { p: [1, -1, 0], c: AMBER },
    { p: [3.2, -1, 0], c: AMBER },
  ]
  return (
    <group ref={group} rotation={[0.15, -0.5, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[trunk, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={GRAY} transparent opacity={0.7} />
      </lineSegments>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[branchA, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={ICE} transparent opacity={0.8} />
      </lineSegments>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[branchB, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={AMBER} transparent opacity={0.7} />
      </lineSegments>
      {commits.map((n, i) => (
        <mesh key={i} position={n.p}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color={n.c} emissive={n.c} emissiveIntensity={0.8} />
        </mesh>
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
    <group>
      <group ref={rings} rotation={[Math.PI / 2.6, 0.3, 0]}>
        {[0, 1, 2].map((i) => (
          <Float key={i} speed={1.1} rotationIntensity={0.3} floatIntensity={0.9}>
            <mesh position={[0, (i - 1) * 2.6, 0]}>
              <torusGeometry args={[3.4 - i * 0.5, 0.05, 12, 90]} />
              <meshStandardMaterial
                color={i === 1 ? WHITE : GRAY}
                emissive={i === 1 ? WHITE : GRAY}
                emissiveIntensity={0.7}
                metalness={0.8}
                roughness={0.3}
              />
            </mesh>
          </Float>
        ))}
      </group>
      <CommitGraph />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Station 3 — payments switch: rails, settlements, live ledger       */
/* ------------------------------------------------------------------ */
const PAY_POOL = [
  '$ tail -f /var/log/payments/switch.log',
  '[ok] ₹2,450.00  upi://kirana@icici   settled 38ms',
  '[ok] ₹180.00    p2p: vinod → rahul    settled 22ms',
  '[ok] ₹12,999.00 merchant pos-88214    authed 61ms',
  '[warn] ₹500.00  nb-hdfc retry=1       backoff 300ms',
  '[ok] ₹75.00     upi://chai@paytm      settled 19ms',
  '[ok] refund ₹640.00 txn-7f3a → source queued',
  '[ok] ₹3,200.00  split 3 ways          balanced',
  '[info] switch tps=1,284 p99=74ms',
  '[ok] ₹999.00    subscription renew    settled 45ms',
]

function PaymentsStation() {
  const core = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const packets = useRef<(THREE.Mesh | null)[]>([])
  const R = 3.6
  const RAILS = 4
  const PACKETS = 8

  const rails = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < RAILS; i++) {
      const a = (i / RAILS) * Math.PI * 2 + Math.PI / 4
      arr.push(0, 0, 0, Math.cos(a) * R, 0, Math.sin(a) * R)
    }
    return new Float32Array(arr)
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (core.current) {
      core.current.rotation.y = t * 0.4
      core.current.rotation.x = Math.sin(t * 0.3) * 0.2
    }
    packets.current.forEach((p, i) => {
      if (!p) return
      const a = ((i % RAILS) / RAILS) * Math.PI * 2 + Math.PI / 4
      const k = (t * 0.35 + i / PACKETS) % 1
      const d = i % 2 === 0 ? k : 1 - k
      p.position.set(Math.cos(a) * R * d, Math.sin(t * 2 + i) * 0.15, Math.sin(a) * R * d)
      p.scale.setScalar(0.6 + Math.sin(k * Math.PI) * 0.9)
    })
    if (ring.current) {
      const k = (t * 0.45) % 1
      ring.current.scale.setScalar(0.6 + k * 3.2)
      ;(ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.45
    }
  })

  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={core}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color={WHITE}
            emissive={ICE}
            emissiveIntensity={0.45}
            metalness={0.8}
            roughness={0.2}
            flatShading
          />
        </mesh>
      </Float>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.02, 8, 64]} />
        <meshBasicMaterial color={ICE} transparent opacity={0.4} />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[rails, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={GRAY} transparent opacity={0.5} />
      </lineSegments>
      {Array.from({ length: RAILS }, (_, i) => {
        const a = (i / RAILS) * Math.PI * 2 + Math.PI / 4
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * R, 0, Math.sin(a) * R]}
            rotation={[0.3, a, 0.15]}
          >
            <boxGeometry args={[0.42, 0.42, 0.42]} />
            <meshStandardMaterial
              color={[WHITE, ICE, AMBER, DIM][i]}
              emissive={[WHITE, ICE, AMBER, DIM][i]}
              emissiveIntensity={0.35}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        )
      })}
      {Array.from({ length: PACKETS }, (_, i) => (
        <mesh
          key={`p${i}`}
          ref={(el) => {
            packets.current[i] = el
          }}
        >
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color={i % 2 === 0 ? ICE : AMBER} transparent opacity={0.9} />
        </mesh>
      ))}
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.6}>
        <TerminalPanel
          position={[0.6, 2.4, -1.4]}
          rotation={[-0.06, -0.42, 0.02]}
          seed={9}
          pool={PAY_POOL}
          header="vinod@blr: ~/payments"
          lines={8}
        />
      </Float>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Station 4 — skill core with orbiters                               */
/* ------------------------------------------------------------------ */
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
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
    </mesh>
  )
}

function PodWave() {
  const COLS = 18
  const ROWS = 7
  const COUNT = COLS * ROWS
  const ref = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const base = useMemo(() => new THREE.Color('#9a9a9a'), [])
  const crest = useMemo(() => new THREE.Color(ICE), [])
  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh) return
    const t = clock.getElapsedTime()
    let i = 0
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const h =
          Math.sin(c * 0.55 + t * 1.4) * 0.34 + Math.cos(r * 0.7 + t * 1.1) * 0.26
        dummy.position.set((c - COLS / 2) * 0.62, h, (r - ROWS / 2) * 0.62)
        dummy.rotation.set(0, t * 0.15, 0)
        dummy.scale.setScalar(0.15 + Math.max(0, h) * 0.24)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
        mesh.setColorAt(i, h > 0.36 ? crest : base)
        i++
      }
    }
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })
  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, COUNT]}
      frustumCulled={false}
      position={[0, -3.1, 0]}
      rotation={[0.32, 0.5, 0]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial metalness={0.6} roughness={0.35} />
    </instancedMesh>
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
          <icosahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial
            color={DIM}
            emissive={GRAY}
            emissiveIntensity={0.3}
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
          radius={3.0}
          size={i % 2 ? 0.34 : 0.22}
          color={[WHITE, GRAY, DIM, '#5f5f5f'][i % 4]}
          speed={0.28}
          yAmp={1.6}
        />
      ))}
      <PodWave />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Station 5 — particle sphere handshake                              */
/* ------------------------------------------------------------------ */
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
        <pointsMaterial color={WHITE} size={0.035} transparent opacity={0.85} sizeAttenuation />
      </points>
      <mesh rotation={[0.6, 0.4, 0]}>
        <torusGeometry args={[4.6, 0.03, 12, 100]} />
        <meshBasicMaterial color={GRAY} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */

function Station({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <group
      position={[STATION_X[index], STATION_Y[index], -index * STATION_DEPTH + STATION_Z[index]]}
      rotation={[0, STATION_RY[index], 0]}
    >
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
        backgroundColor: '#050505',
        backgroundImage: [
          'radial-gradient(1.5px 1.5px at 12% 22%, rgba(255,255,255,0.9), transparent)',
          'radial-gradient(1px 1px at 68% 12%, rgba(255,255,255,0.6), transparent)',
          'radial-gradient(1.5px 1.5px at 42% 68%, rgba(255,255,255,0.7), transparent)',
          'radial-gradient(1px 1px at 84% 54%, rgba(255,255,255,0.5), transparent)',
          'radial-gradient(2px 2px at 28% 86%, rgba(255,255,255,0.55), transparent)',
          'radial-gradient(1px 1px at 56% 38%, rgba(255,255,255,0.8), transparent)',
          'radial-gradient(1.5px 1.5px at 90% 82%, rgba(255,255,255,0.6), transparent)',
          'radial-gradient(1px 1px at 8% 56%, rgba(255,255,255,0.45), transparent)',
          'radial-gradient(circle at 50% 120%, rgba(255,255,255,0.12), transparent 55%)',
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
          dpr={[1, 2]}
          camera={{ fov: 55, position: [0, 0, 10], near: 0.1, far: 220 }}
        >
          <color attach="background" args={['#050505']} />
          <fog attach="fog" args={['#050505', 10, 36]} />
          <ambientLight intensity={0.32} />
          <pointLight position={[6, 6, 6]} intensity={60} color={WHITE} />
          <pointLight position={[-8, -4, -6]} intensity={40} color={GRAY} />
          <Stars radius={110} depth={70} count={2800} factor={4} saturation={0} fade speed={0.5} />
          <BackboneStream />
          <gridHelper
            args={[600, 140, '#262626', '#151515']}
            position={[0, -6.5, -TOTAL_DEPTH / 2]}
          />
          <Rig>
            <Station index={0}><ServiceMeshStation /></Station>
            <Station index={1}><TerminalStation /></Station>
            <Station index={2}><ExperienceStation /></Station>
            <Station index={3}><PaymentsStation /></Station>
            <Station index={4}><SkillsStation /></Station>
            <Station index={5}><ContactStation /></Station>
          </Rig>
          <EffectComposer>
            <Bloom intensity={0.42} luminanceThreshold={0.4} luminanceSmoothing={0.25} mipmapBlur radius={0.72} />
            <Vignette offset={0.22} darkness={0.88} />
          </EffectComposer>
        </Canvas>
      </div>
    </SceneBoundary>
  )
}
