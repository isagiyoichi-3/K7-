import { ArrowUpRight } from 'lucide-react'
import { FadeIn, SectionShell } from '@/components/ui-bits'
import { projects } from '@/data/portfolio'
import imgAutotest from '@/assets/project-autotest.png'
import imgBot from '@/assets/project-bot.png'
import imgExpense from '@/assets/project-expense.png'

const images: Record<string, string> = {
  'AutoTest MCP': imgAutotest,
  'Developer Support Bot': imgBot,
  'Expense Tracker': imgExpense,
}

export default function Projects() {
  return (
    <SectionShell id="projects" index="03" kicker="Selected Work" className="grid-lines">
      <FadeIn delay={0.1}>
        <h2 className="mt-12 text-4xl sm:text-5xl font-bold text-[#dcf5ff]">
          Things I&apos;ve <span className="text-gradient-icy">built</span>
        </h2>
      </FadeIn>

      <div className="mt-16 space-y-10">
        {projects.map((p, i) => (
          <FadeIn key={p.title} delay={0.06 * i}>
            <article
              className={`glass-panel rounded-md overflow-hidden grid md:grid-cols-2 group ${
                i % 2 === 1 ? 'md:[direction:rtl]' : ''
              }`}
            >
              <div className="relative overflow-hidden [direction:ltr]">
                <img
                  src={images[p.title]}
                  alt={p.imageAlt}
                  className="h-64 md:h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent md:bg-gradient-to-r" />
                <span
                  className="absolute top-4 left-4 font-mono-tech text-[10px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-sm"
                  style={{ color: p.color, backgroundColor: '#05070acc', border: `1px solid ${p.color}55` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="p-7 sm:p-10 flex flex-col justify-center [direction:ltr]">
                <p className="font-mono-tech text-[11px] tracking-[0.3em] uppercase" style={{ color: p.color }}>
                  {p.subtitle}
                </p>
                <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-[#dcf5ff] inline-flex items-center gap-2">
                  {p.title}
                  <ArrowUpRight className="w-5 h-5 text-[#8a94a6] opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                </h3>
                <p className="mt-4 text-[#9fb3c8] leading-relaxed">{p.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono-tech text-[11px] px-2.5 py-1 rounded-sm border border-[#68cbcb]/20 text-[#9fb3c8] bg-[#68cbcb]/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  )
}
