import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function FadeIn({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionShell({
  id,
  index,
  kicker,
  children,
  className = '',
}: {
  id: string
  index: string
  kicker: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative z-10 px-6 sm:px-10 lg:px-16 ${className}`}>
      <div className="mx-auto max-w-6xl py-28 sm:py-36">
        <FadeIn>
          <p className="font-mono-tech text-xs sm:text-sm tracking-[0.35em] text-white/85 text-backdrop">
            <span className="text-[#8fd0ff]">{index}</span> · {kicker}
          </p>
        </FadeIn>
        {children}
      </div>
    </section>
  )
}
