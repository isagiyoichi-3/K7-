import { useEffect } from 'react'
import Scene3D, { updateScrollProgress } from '@/components/scene/Scene3D'
import Nav from '@/components/Nav'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Experience from '@/sections/Experience'
import Projects from '@/sections/Projects'
import Skills from '@/sections/Skills'
import Profiles from '@/sections/Profiles'
import Contact from '@/sections/Contact'

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
    <div className="relative min-h-screen bg-[#05070a] text-[#dcf5ff]">
      <Scene3D />
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
