import { motion } from 'framer-motion'
import { FadeIn, SectionShell } from '@/components/ui-bits'
import { marqueeSkills, skillGroups } from '@/data/portfolio'

function Marquee() {
  const row = [...marqueeSkills, ...marqueeSkills]
  return (
    <div className="relative mt-20 overflow-hidden border-y border-[#68cbcb]/10 py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <motion.div
        className="flex w-max gap-10"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 32, ease: 'linear' }}
      >
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-mono-tech text-sm tracking-[0.3em] text-[#8a94a6]">{s}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-[#586596]" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  return (
    <SectionShell id="skills" index="04" kicker="Arsenal">
      <FadeIn delay={0.1}>
        <h2 className="mt-12 text-4xl sm:text-5xl font-bold text-[#dcf5ff]">
          Tech I <span className="text-gradient-icy">reach for</span>
        </h2>
      </FadeIn>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <FadeIn key={g.label} delay={0.08 * i}>
            <div className="glass-panel rounded-md p-7 h-full hover:border-[#68cbcb]/25 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rotate-45" style={{ backgroundColor: g.color, boxShadow: `0 0 12px ${g.color}` }} />
                <h3 className="font-mono-tech text-xs tracking-[0.3em] uppercase" style={{ color: g.color }}>
                  {g.label}
                </h3>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="font-mono-tech text-[12px] px-3 py-1.5 rounded-sm border text-[#c9d8e8] transition-all duration-200 hover:-translate-y-0.5"
                    style={{ borderColor: `${g.color}40`, backgroundColor: `${g.color}0f` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <Marquee />
    </SectionShell>
  )
}
