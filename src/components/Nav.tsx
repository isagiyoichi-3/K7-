import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-panel border-b border-white/10' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 py-4">
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="font-mono-tech text-xl font-bold leading-none tracking-tight text-gradient-ice">
            K7
          </span>
          <span className="h-4 w-[2px] bg-[#8fd0ff]/70 animate-pulse" aria-hidden />
          <span className="hidden sm:inline font-mono-tech text-[10px] tracking-[0.3em] text-neutral-300 uppercase group-hover:text-white transition-colors">
            / backend tooling
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono-tech text-xs tracking-[0.2em] uppercase text-neutral-300 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="font-mono-tech text-xs tracking-widest uppercase border border-[#8fd0ff]/50 text-[#eaf6ff] px-4 py-2 rounded-sm hover:border-[#8fd0ff] hover:bg-[#8fd0ff]/10 transition-all"
        >
          Hire me
        </a>
      </nav>
      <motion.div
        className="h-[2px] origin-left bg-gradient-to-r from-[#5ea2ff] via-[#9bd8ff] to-white"
        style={{ scaleX: progress }}
      />
    </header>
  )
}
