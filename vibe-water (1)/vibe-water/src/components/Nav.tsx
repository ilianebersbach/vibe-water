import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, useScroll, useTransform } from 'framer-motion'
import TextRoll from './ui/text-roll'
import Magnet from './Magnet'

const navLinks = ['Why Vibe', 'Flavors', 'Story', 'Shop']
const navIds   = ['benefits', 'flavors', 'story', 'footer']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.92])

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 40))
    return () => unsub()
  }, [scrollY])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        opacity: 0, y: -24,
        duration: 1.0,
        delay: 0.2,
        ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-shadow duration-500"
      style={{
        backgroundColor: `rgba(12,12,12,${bgOpacity.get()})`,
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <div
        className="font-black tracking-[0.14em] text-lg cursor-pointer select-none"
        style={{
          background: 'linear-gradient(90deg, #C0392B, #00D4FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        VIBE WATER
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link, i) => (
          <button
            key={link}
            onClick={() => scrollTo(navIds[i])}
            className="text-sm font-500 tracking-wider overflow-hidden leading-none"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <TextRoll className="text-sm font-medium tracking-wider" center>
              {link}
            </TextRoll>
          </button>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center gap-3">
        <Magnet>
          <button
            className="px-6 py-2.5 rounded-full text-sm font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            style={{ background: 'linear-gradient(135deg, #C0392B, #2980B9)' }}
            onClick={() => scrollTo('footer')}
          >
            Shop Now
          </button>
        </Magnet>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className="block w-6 h-0.5 bg-white/70 rounded transition-all duration-300" style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
        <span className="block w-6 h-0.5 bg-white/70 rounded transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
        <span className="block w-6 h-0.5 bg-white/70 rounded transition-all duration-300" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
      </button>

      {/* Mobile menu */}
      <motion.div
        className="absolute top-full left-0 right-0 md:hidden flex flex-col gap-1 px-6 py-6 border-t"
        style={{
          background: 'rgba(12,12,12,0.97)',
          borderColor: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -10 }}
        transition={{ duration: 0.25 }}
        pointerEvents={menuOpen ? 'auto' : 'none'}
      >
        {navLinks.map((link, i) => (
          <button
            key={link}
            onClick={() => scrollTo(navIds[i])}
            className="text-left py-3 text-white/70 font-medium tracking-wider text-sm border-b border-white/[0.06] last:border-0 hover:text-white transition-colors"
          >
            {link}
          </button>
        ))}
        <button
          className="mt-4 w-full py-3 rounded-full text-sm font-bold tracking-wide text-white"
          style={{ background: 'linear-gradient(135deg, #C0392B, #2980B9)' }}
          onClick={() => scrollTo('footer')}
        >
          Shop Now
        </button>
      </motion.div>
    </motion.nav>
  )
}
