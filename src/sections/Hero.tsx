import { motion } from 'framer-motion'
import { ChevronDown, Send } from 'lucide-react'
import { heroStats, profile } from '@/data/portfolio'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center pt-24 pb-20"
    >
      <div className="relative">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="font-mono-tech text-[11px] sm:text-sm tracking-[0.45em] uppercase text-white/85"
        >
          {'// Software Engineer · B.Tech CSE 2024'}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="mt-6 font-bold leading-[0.95] tracking-tight text-white text-glow text-backdrop"
          style={{ fontSize: 'clamp(3rem, 10.5vw, 8.5rem)' }}
        >
          {profile.firstName}
          <br />
          <span className="text-gradient-mono">{profile.lastName}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="mx-auto mt-8 max-w-2xl text-base sm:text-lg text-neutral-200 leading-relaxed text-backdrop"
        >
          {profile.focus} — {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.68, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#experience"
            className="group relative font-mono-tech text-xs sm:text-sm tracking-[0.2em] uppercase px-7 py-3.5 border border-white/40 text-white rounded-sm overflow-hidden transition-all hover:border-[#8fd0ff]/70 hover:text-[#eaf6ff]"
          >
            <span className="absolute inset-0 bg-[#8fd0ff]/15 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            <span className="relative">GET /experience</span>
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="font-mono-tech text-xs sm:text-sm tracking-[0.2em] uppercase px-7 py-3.5 text-neutral-200 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> POST /contact
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="relative mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden"
      >
        {heroStats.map((s) => (
          <div key={s.label} className="bg-black/85 backdrop-blur px-6 py-4 min-w-[9.5rem]">
            <p className="font-mono-tech text-2xl font-bold text-white">{s.value}</p>
            <p className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-neutral-300 mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-300"
      >
        <span className="font-mono-tech text-[10px] tracking-[0.4em] uppercase">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ChevronDown className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>
    </section>
  )
}
