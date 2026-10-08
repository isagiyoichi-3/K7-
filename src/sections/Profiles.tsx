import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { FadeIn, SectionShell } from '@/components/ui-bits'
import { codingProfiles } from '@/data/portfolio'

function TiltCard({ platform, metric, note }: { platform: string; metric: string; note: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 180, damping: 18 })

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', perspective: 800 }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
      }}
      onPointerLeave={() => {
        mx.set(0.5)
        my.set(0.5)
      }}
      className="glass-panel rounded-md p-7 text-center cursor-default select-none hover:border-white/30 transition-colors"
    >
      <div style={{ transform: 'translateZ(30px)' }}>
        <Trophy className="w-5 h-5 mx-auto text-white" />
        <p className="mt-4 font-mono-tech text-[11px] tracking-[0.3em] uppercase text-neutral-300">
          {platform}
        </p>
        <p className="mt-2 text-3xl font-bold text-white text-glow">{metric}</p>
        <p className="mt-2 font-mono-tech text-[11px] text-neutral-300">{note}</p>
      </div>
    </motion.div>
  )
}

export default function Profiles() {
  return (
    <SectionShell id="profiles" index="05" kicker="GET /profiles" className="grid-lines">
      <FadeIn delay={0.1}>
        <h2 className="mt-12 text-4xl sm:text-5xl font-bold text-white text-backdrop">
          Competitive <span className="text-gradient-mono">programming</span>
        </h2>
      </FadeIn>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {codingProfiles.map((p, i) => (
          <FadeIn key={p.platform} delay={0.07 * i}>
            <TiltCard {...p} />
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  )
}
