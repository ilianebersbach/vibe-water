import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import Magnet from '../Magnet'
import TextRoll from '../ui/text-roll'

gsap.registerPlugin(ScrollTrigger)

const marqueeItems = [
  'ZERO CALORIES', '✦', 'PURE HYDRATION', '✦',
  'SUSTAINABLE PACKAGING', '✦', 'BORN IN MIAMI', '✦',
  'ZERO CALORIES', '✦', 'PURE HYDRATION', '✦',
  'SUSTAINABLE PACKAGING', '✦', 'BORN IN MIAMI', '✦',
]

const footerLinks = [
  ['Product', ['Original', 'Sparkling', 'Infused', 'Shop All']],
  ['Company', ['Our Story', 'Press', 'Careers', 'Wholesale']],
  ['Support', ['FAQ', 'Shipping', 'Returns', 'Contact']],
  ['Legal', ['Privacy Policy', 'Terms of Service', 'Accessibility']],
]

export default function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Giant bg text parallax
      gsap.fromTo(
        bgTextRef.current,
        { y: '15vh', scale: 0.85, opacity: 0 },
        {
          y: '0vh', scale: 1, opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        }
      )

      // Heading reveal
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 70,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Links stagger
      const cols = linksRef.current?.querySelectorAll('.footer-col')
      if (cols) {
        gsap.from(cols, {
          opacity: 0,
          y: 40,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: linksRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Marquee top strip */}
      <div
        className="overflow-hidden border-b py-4"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}
      >
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="mx-8 text-xs font-bold tracking-[0.28em] uppercase whitespace-nowrap"
              style={{ color: 'rgba(255,255,255,0.22)' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Giant bg text */}
      <div
        ref={bgTextRef}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap"
        style={{
          fontSize: '22vw',
          fontWeight: 900,
          letterSpacing: '-0.05em',
          lineHeight: 0.8,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          zIndex: 0,
        }}
      >
        VIBE
      </div>

      {/* Aurora glow */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] pointer-events-none pulse-glow"
        style={{
          background: 'radial-gradient(ellipse, rgba(41,128,185,0.08) 0%, rgba(192,57,43,0.04) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-16">
        {/* CTA heading */}
        <div className="text-center mb-16">
          <motion.div
            className="text-[#00D4FF] text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready?
          </motion.div>
          <h2
            ref={headingRef}
            className="font-black tracking-[-0.04em] mb-12"
            style={{
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.9,
              background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.38) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Feel the<br />difference.
          </h2>

          {/* CTA Buttons */}
          <div className="flex gap-5 justify-center flex-wrap mb-6">
            <Magnet>
              <button
                className="px-12 py-5 rounded-full font-bold text-base tracking-wide text-white transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                style={{ background: 'linear-gradient(135deg, #C0392B, #2980B9)' }}
              >
                Shop Now
              </button>
            </Magnet>
            <Magnet>
              <button className="px-12 py-5 rounded-full font-semibold text-base tracking-wide text-white/75 border border-white/18 bg-transparent transition-all duration-400 hover:border-white/45 hover:-translate-y-2">
                Find a Store
              </button>
            </Magnet>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mb-16"
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          }}
        />

        {/* Footer links grid */}
        <div
          ref={linksRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16"
        >
          {footerLinks.map(([category, links]) => (
            <div key={category as string} className="footer-col">
              <div className="text-white/40 text-xs font-semibold tracking-[0.22em] uppercase mb-5">
                {category as string}
              </div>
              <ul className="space-y-3">
                {(links as string[]).map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/55 text-sm font-light hover:text-white/90 transition-colors duration-300 tracking-wide inline-block overflow-hidden"
                    >
                      <TextRoll className="text-sm font-light">{link}</TextRoll>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mb-8"
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          {/* Logo */}
          <div
            className="font-black tracking-[0.15em] text-xl"
            style={{
              background: 'linear-gradient(90deg, #C0392B, #00D4FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            VIBE WATER
          </div>

          {/* Copyright */}
          <div className="text-white/22 text-xs tracking-[0.14em] font-light">
            © 2026 Vibe Water. All rights reserved.
          </div>

          {/* Made with + back to top */}
          <div className="flex items-center gap-5">
            <div className="text-white/28 text-xs font-semibold tracking-[0.1em]">
              Made with 💧 in Miami
            </div>
            <Magnet>
              <button
                onClick={scrollToTop}
                className="w-11 h-11 rounded-full border border-white/12 bg-white/[0.04] text-white/45 hover:text-white hover:border-white/35 transition-all duration-300 flex items-center justify-center text-lg hover:-translate-y-1"
                aria-label="Back to top"
              >
                ↑
              </button>
            </Magnet>
          </div>
        </div>
      </div>
    </footer>
  )
}
