import { GraduationCap, MapPin } from 'lucide-react'
import { FadeIn, SectionShell } from '@/components/ui-bits'
import { coursework, profile } from '@/data/portfolio'

export default function About() {
  return (
    <SectionShell id="about" index="01" kicker="About" className="grid-lines">
      <div className="mt-12 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20 items-start">
        <div>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-[#dcf5ff]">
              Backend engineer with an
              <span className="text-[#68cbcb]"> automation-first </span>
              mindset.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-[#9fb3c8] leading-relaxed text-base sm:text-lg">
              I&apos;m Vinod — a Software Development Engineer working on backend tooling,
              microservices and test automation at PhonePe. My work lives where CI pipelines,
              distributed systems and developer experience intersect: platforms like AutoTest
              that run thousands of tests across 33+ PODs, bots that answer onboarding questions
              with RAG, and microservices that make pipeline configuration safe and replayable.
            </p>
            <p className="mt-5 text-[#9fb3c8] leading-relaxed text-base sm:text-lg">
              Before that, at SenseHQ, I owned automation suites from scratch, patched critical
              orchestrator bugs, and carried the on-call pager for customer-escalation queues.
              I started out setting algorithmic problems for hiring assessments — which explains
              why I still chase the Knight badge on LeetCode.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="glass-panel rounded-md p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-[#68cbcb]" />
              <h3 className="font-mono-tech text-xs tracking-[0.3em] uppercase text-[#68cbcb]">
                Education
              </h3>
            </div>
            <p className="mt-5 text-xl font-semibold text-[#dcf5ff]">{profile.college}</p>
            <p className="mt-1.5 text-[#9fb3c8]">{profile.degree}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono-tech text-xs text-[#8a94a6]">
              <span>{profile.collegeYears}</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {profile.collegeLocation}
              </span>
              <span className="text-[#68cbcb]">CGPA {profile.cgpa}</span>
            </div>
            <div className="my-6 h-px bg-[#68cbcb]/10" />
            <h4 className="font-mono-tech text-[10px] tracking-[0.3em] uppercase text-[#8a94a6]">
              Coursework
            </h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {coursework.map((c) => (
                <span
                  key={c}
                  className="font-mono-tech text-[11px] tracking-wide px-3 py-1.5 rounded-sm border border-[#586596]/40 text-[#9fb3c8] bg-[#586596]/10"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}
