import { Github, Mail, MapPin, Phone } from 'lucide-react'
import { FadeIn, SectionShell } from '@/components/ui-bits'
import { profile } from '@/data/portfolio'

export default function Contact() {
  return (
    <SectionShell id="contact" index="06" kicker="Contact">
      <div className="mt-12 flex flex-col items-center text-center">
        <FadeIn delay={0.1}>
          <h2
            className="font-bold leading-[0.95] text-[#dcf5ff] text-glow-cyan"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 6rem)' }}
          >
            Let&apos;s build
            <br />
            <span className="text-gradient-icy">reliable systems.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.25}>
          <p className="mt-8 max-w-xl text-[#9fb3c8] leading-relaxed">
            Open to conversations about backend tooling, test platforms, microservices and
            developer automation — and to the problems that keep breaking your pipelines.
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group relative font-mono-tech text-xs sm:text-sm tracking-[0.2em] uppercase px-8 py-4 bg-[#68cbcb] text-[#05070a] font-bold rounded-sm overflow-hidden"
            >
              <span className="absolute inset-0 bg-[#dcf5ff] scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100" />
              <span className="relative inline-flex items-center gap-2">
                <Mail className="w-4 h-4" /> {profile.email}
              </span>
            </a>
            <a
              href={profile.phoneHref}
              className="font-mono-tech text-xs sm:text-sm tracking-[0.2em] uppercase px-8 py-4 border border-[#586596]/60 text-[#9fb3c8] rounded-sm inline-flex items-center gap-2 hover:border-[#68cbcb] hover:text-[#dcf5ff] transition-colors"
            >
              <Phone className="w-4 h-4" /> {profile.phone}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div className="mt-10 flex items-center gap-6 font-mono-tech text-[11px] tracking-[0.25em] uppercase text-[#8a94a6]">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#68cbcb]" /> {profile.location}
            </span>
            <span className="h-3 w-px bg-[#586596]" />
            <span className="inline-flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-[#68cbcb]" /> {profile.github}
            </span>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <footer className="mt-28 border-t border-[#68cbcb]/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono-tech text-[11px] tracking-[0.2em] uppercase text-[#586596]">
          <p>© 2026 Vinod Kesavan</p>
          <p>Backend Tooling · Microservices · Automation</p>
          <p className="text-[#68cbcb]/60">Designed & engineered in 3D</p>
        </footer>
      </FadeIn>
    </SectionShell>
  )
}
