import { Github, Mail, MapPin, Phone } from 'lucide-react'
import { FadeIn, SectionShell } from '@/components/ui-bits'
import { profile } from '@/data/portfolio'

export default function Contact() {
  return (
    <SectionShell id="contact" index="06" kicker="POST /contact">
      <div className="mt-12 flex flex-col items-center text-center">
        <FadeIn delay={0.1}>
          <h2
            className="font-bold leading-[0.95] text-white text-glow text-backdrop"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 6rem)' }}
          >
            Let&apos;s build
            <br />
            <span className="text-gradient-mono">reliable systems.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.25}>
          <p className="mt-8 max-w-xl text-neutral-300 leading-relaxed text-backdrop">
            Open to conversations about backend platforms, microservices and developer tooling —
            and to the hard problems that keep breaking your pipelines.
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group relative font-mono-tech text-xs sm:text-sm tracking-[0.2em] uppercase px-8 py-4 bg-gradient-to-r from-[#0d2c4f] to-[#123c6b] border border-[#8fd0ff]/40 text-[#dff3ff] font-bold rounded-sm overflow-hidden"
            >
              <span className="absolute inset-0 bg-[#8fd0ff]/20 scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
              <span className="relative inline-flex items-center gap-2">
                <Mail className="w-4 h-4" /> {profile.email}
              </span>
            </a>
            <a
              href={profile.phoneHref}
              className="font-mono-tech text-xs sm:text-sm tracking-[0.2em] uppercase px-8 py-4 border border-white/25 text-neutral-200 rounded-sm inline-flex items-center gap-2 hover:border-white hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" /> {profile.phone}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div className="mt-10 flex items-center gap-6 font-mono-tech text-[11px] tracking-[0.25em] uppercase text-neutral-300 text-backdrop">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-white" /> {profile.location}
            </span>
            <span className="h-3 w-px bg-white/30" />
            <span className="inline-flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-white" /> {profile.github}
            </span>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <footer className="mt-28 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-tech text-[11px] tracking-[0.2em] uppercase text-neutral-300">
          <p>© 2026 Vinod Kesavan</p>
          <p>Backend Platforms · Microservices · Developer Tooling</p>
          <p className="text-white/85">Designed & engineered in 3D</p>
        </footer>
      </FadeIn>
    </SectionShell>
  )
}
