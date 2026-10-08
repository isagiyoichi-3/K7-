import { useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Scene3D, { updateScrollProgress } from '@/components/scene/Scene3D'
import Nav from '@/components/Nav'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Experience from '@/sections/Experience'
import Projects from '@/sections/Projects'
import Skills from '@/sections/Skills'
import Profiles from '@/sections/Profiles'
import Contact from '@/sections/Contact'
import portrait from '@/assets/portrait-glow.webp'

function PortraitBackdrop() {
  const { scrollY } = useScroll()
  const yTarget = useTransform(scrollY, [0, 8000], [160, -220])
  const y = useSpring(yTarget, { stiffness: 30, damping: 26, mass: 0.7 })
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      <div className="absolute left-[-8%] top-1/2 -translate-y-1/2 w-[min(72vw,34rem)] lg:left-[2%] lg:w-[34rem]">
        <motion.div style={{ y }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 62% 58% at 50% 38%, #050505 55%, rgba(5,5,5,0.9) 70%, rgba(5,5,5,0) 90%)',
            }}
          />
          <img
            src={portrait}
            alt=""
            className="relative w-full object-cover opacity-[0.5] lg:opacity-[0.58]"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    updateScrollProgress()
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(updateScrollProgress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#050505] text-neutral-100">
      <Scene3D />
      <PortraitBackdrop />
      <div className="noise pointer-events-none fixed inset-0 z-40 opacity-[0.03]" aria-hidden />
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Profiles />
        <Contact />
      </main>
    </div>
  )
}
