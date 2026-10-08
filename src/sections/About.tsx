import { Terminal } from 'lucide-react'
import { FadeIn, SectionShell } from '@/components/ui-bits'
import { profile, terminalCard } from '@/data/portfolio'

export default function About() {
  return (
    <SectionShell id="about" index="01" kicker="GET /about" className="grid-lines">
      <div className="mt-12 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20 items-start">
        <div>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-white text-backdrop">
              Backend engineer with an
              <span className="text-gradient-mono"> automation-first </span>
              mindset.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-neutral-300 leading-relaxed text-base sm:text-lg">
              I&apos;m Vinod — a Software Engineer building backend platforms, microservices and
              developer tooling at PhonePe, and a 2024 B.Tech CSE passout. My work lives where
              CI pipelines, distributed systems and developer experience intersect: platforms
              that orchestrate thousands of pipeline runs across 33+ PODs, bots that answer
              onboarding questions with RAG, and microservices that make pipeline configuration
              safe and replayable.
            </p>
            <p className="mt-5 text-neutral-300 leading-relaxed text-base sm:text-lg">
              Before that, at SenseHQ, I built integration frameworks from scratch, patched
              critical orchestrator bugs, and carried the on-call pager for customer-escalation
              queues. I started out authoring algorithmic problems for hiring assessments — which
              explains why I still chase the Knight badge on LeetCode.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="glass-panel rounded-md overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-5 py-3">
              <Terminal className="w-4 h-4 text-white" />
              <span className="font-mono-tech text-[11px] tracking-[0.25em] uppercase text-neutral-300">
                vinod@blr: ~/about
              </span>
              <span className="ml-auto flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/75" />
              </span>
            </div>
            <div className="p-6 sm:p-7 font-mono-tech text-[13px] leading-relaxed">
              <p className="text-neutral-300">$ cat developer.profile</p>
              <dl className="mt-4 space-y-3">
                {terminalCard.map((row) => (
                  <div key={row.key} className="grid grid-cols-[86px_1fr] gap-3">
                    <dt className="text-neutral-300">{row.key}:</dt>
                    <dd className="text-neutral-200">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-neutral-300">
                $ echo $FOCUS<span className="ml-2 text-white">{profile.focus}</span>
              </p>
              <p className="mt-2 text-neutral-300">
                $ <span className="inline-block h-4 w-2 translate-y-0.5 bg-white animate-caret-blink" />
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  )
}
