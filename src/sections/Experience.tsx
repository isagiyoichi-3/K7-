import { Briefcase, MapPin } from 'lucide-react'
import { FadeIn, SectionShell } from '@/components/ui-bits'
import { experience } from '@/data/portfolio'

export default function Experience() {
  return (
    <SectionShell id="experience" index="02" kicker="GET /experience">
      <FadeIn delay={0.1}>
        <h2 className="mt-12 text-4xl sm:text-5xl font-bold text-white text-backdrop">
          Where I&apos;ve <span className="text-gradient-mono">worked</span>
        </h2>
      </FadeIn>

      <div className="mt-16 relative">
        <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-white/70 via-white/25 to-transparent" />
        <ol className="space-y-16">
          {experience.map((job, i) => (
            <li key={job.company} className="relative pl-10 sm:pl-14">
              <span
                className="absolute left-0 top-2 h-4 w-4 rounded-full border-2"
                style={{
                  borderColor: job.shade,
                  backgroundColor: '#050505',
                  boxShadow: `0 0 18px ${job.shade}66`,
                }}
              />
              <FadeIn delay={0.08 * i}>
                <article className="glass-panel rounded-md p-6 sm:p-8 hover:border-white/30 transition-colors duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold" style={{ color: job.shade }}>
                        {job.company}
                      </h3>
                      <p className="mt-1.5 text-neutral-200 font-medium">{job.role}</p>
                    </div>
                    <div className="font-mono-tech text-xs text-right space-y-1.5">
                      <p className="text-white tracking-widest">{job.period}</p>
                      <p className="text-neutral-300 inline-flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3.5">
                    {job.points.map((pt, j) => (
                      <li key={j} className="flex gap-3 text-neutral-300 leading-relaxed text-[15px]">
                        <span
                          className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45"
                          style={{ backgroundColor: job.shade }}
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>

      <FadeIn delay={0.1}>
        <p className="mt-14 font-mono-tech text-xs tracking-[0.25em] uppercase text-neutral-300 text-backdrop inline-flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-white" />
          Currently: Software Engineer at PhonePe, Bangalore
        </p>
      </FadeIn>
    </SectionShell>
  )
}
