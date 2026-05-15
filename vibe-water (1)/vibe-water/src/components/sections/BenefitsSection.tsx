import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Spotlight } from '../ui/spotlight'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  {
    icon: '💧',
    num: '0',
    unit: 'CAL',
    title: 'Zero Calories',
    desc: 'Pure H₂O with nothing you don\'t need. No sugar, no sweeteners, no compromise. Just water doing its job, beautifully.',
    color: '#00D4FF',
    glow: 'rgba(0,212,255,0.12)',
    border: 'rgba(0,212,255,0.18)',
  },
  {
    icon: '⚡',
    num: '100',
    unit: '%',
    title: 'Pure Hydration',
    desc: 'Premium purified water engineered for maximum absorption. Your body was built for this. We just bottled it with style.',
    color: '#ffffff',
    glow: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.14)',
  },
  {
    icon: '♻',
    num: '∞',
    unit: '',
    title: 'Sustainable Can',
    desc: 'Infinitely recyclable aluminum. Our can has a smaller footprint than plastic — and looks three times as good doing it.',
    color: '#27AE60',
    glow: 'rgba(39,174,96,0.1)',
    border: 'rgba(39,174,96,0.2)',
  },
]

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll('.benefit-card-item')
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 80,
          clipPath: 'inset(100% 0 0 0)',
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 overflow-hidden"
      style={{ background: '#0C0C0C' }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
        }}
      />

      <div ref={headingRef} className="text-center mb-20 max-w-2xl mx-auto">
        <div className="text-[#00D4FF] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          Why Vibe
        </div>
        <h2
          className="font-black leading-[0.92] tracking-[-0.03em] hero-heading"
          style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
        >
          Nothing added.<br />Everything gained.
        </h2>
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {benefits.map((b, i) => (
          <div
            key={i}
            className="benefit-card-item relative rounded-3xl p-10 border transition-all duration-500 hover:-translate-y-2 cursor-default group"
            style={{
              background: `linear-gradient(145deg, ${b.glow}, rgba(255,255,255,0.01))`,
              borderColor: b.border,
            }}
          >
            <Spotlight size={280} />

            {/* Liquid fill pseudo-overlay on hover */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${b.glow}, transparent 65%)`,
              }}
            />

            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 border"
              style={{ background: b.glow, borderColor: b.border }}
            >
              {b.icon}
            </div>

            <div
              className="font-black leading-none tracking-[-0.04em] mb-2"
              style={{ fontSize: 56, color: b.color }}
            >
              {b.num}
              <span className="text-3xl ml-1 opacity-70">{b.unit}</span>
            </div>

            <div className="text-white text-xl font-700 tracking-wide mb-3">
              {b.title}
            </div>
            <div className="text-white/45 text-sm font-light leading-relaxed tracking-wide">
              {b.desc}
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-8 right-8 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(90deg, transparent, ${b.color}, transparent)` }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
