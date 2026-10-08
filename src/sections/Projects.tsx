import { ArrowUpRight } from 'lucide-react'
import { FadeIn, SectionShell } from '@/components/ui-bits'
import { projects } from '@/data/portfolio'
import imgExpense from '@/assets/project-expense.png'

export default function Projects() {
  return (
    <SectionShell id="projects" index="03" kicker="GET /projects" className="grid-lines">
      <FadeIn delay={0.1}>
        <h2 className="mt-12 text-4xl sm:text-5xl font-bold text-white text-backdrop">
          Things I&apos;ve <span className="text-gradient-mono">built</span>
        </h2>
      </FadeIn>

      <div className="mt-16 space-y-10">
        {projects.map((p, i) => (
          <FadeIn key={p.title} delay={0.06 * i}>
            <article className="glass-panel rounded-md overflow-hidden grid md:grid-cols-2 group">
              <div className="relative overflow-hidden bg-black">
                <img
                  src={imgExpense}
                  alt={p.imageAlt}
                  className="photo-mono h-64 md:h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 scanlines opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" />
                <span className="absolute top-4 left-4 font-mono-tech text-[10px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-sm text-white bg-black/80 border border-white/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="p-7 sm:p-10 flex flex-col justify-center">
                <p className="font-mono-tech text-[11px] tracking-[0.3em] uppercase text-neutral-300">
                  {p.subtitle}
                </p>
                <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white inline-flex items-center gap-2">
                  {p.title}
                  <ArrowUpRight className="w-5 h-5 text-neutral-300 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                </h3>
                <p className="mt-4 text-neutral-300 leading-relaxed">{p.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono-tech text-[11px] px-2.5 py-1 rounded-sm border border-white/20 text-neutral-300 bg-white/5"
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
