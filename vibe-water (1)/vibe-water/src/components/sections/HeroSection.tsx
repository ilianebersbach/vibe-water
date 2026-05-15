import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import VibeCan from '../VibeCan'
import AnimatedText from '../AnimatedText'
import Magnet from '../Magnet'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll({ target: sectionRef })
  const canY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgesRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        delay: 1.2,
        duration: 0.8,
        ease: 'power3.out',
      })
      gsap.from(btnsRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        delay: 1.6,
        duration: 0.8,
        ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 70%, rgba(41,128,185,0.12) 0%, transparent 65%), #0C0C0C',
      }}
    >
      <div className="film-grain" />

      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Stars radius={80} depth={60} count={1200} factor={3} fade speed={0.4} />
        </Canvas>
      </div>

      {/* Smoke ground fog */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(41,128,185,0.1) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(20,40,70,0.18) 0%, transparent 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center px-6"
        style={{ opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 px-5 py-2 rounded-full border border-[rgba(0,212,255,0.25)] bg-[rgba(0,212,255,0.06)] text-[#00D4FF] text-xs font-semibold tracking-[0.3em] uppercase"
        >
          12 FL OZ &nbsp;·&nbsp; Zero Calories &nbsp;·&nbsp; Born in Miami
        </motion.div>

        {/* Headline */}
        <h1
          className="font-black leading-[0.88] tracking-[-0.03em] mb-6"
          style={{ fontSize: 'clamp(52px, 9vw, 108px)' }}
        >
          <span className="block hero-heading">
            <AnimatedText text="JUST WATER" delay={0.5} />
          </span>
          <span className="block hero-heading-bright">
            <AnimatedText text="WITH A VIBE" delay={0.8} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="text-white/40 font-light tracking-[0.08em] text-lg mb-10"
        >
          Pure. Clean. Unapologetically different.
        </motion.p>

        {/* 3D Can */}
        <motion.div
          className="relative z-20 mb-10"
          style={{
            width: 220,
            height: 420,
            rotateY: mousePos.x * 18,
            rotateX: mousePos.y * -12,
            y: canY,
          }}
          initial={{ opacity: 0, scale: 0.7, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, type: 'spring', stiffness: 80 }}
        >
          <Canvas
            camera={{ position: [0, 0, 3.2], fov: 45 }}
            style={{ width: 220, height: 420 }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[3, 4, 3]} intensity={2.5} color="#ffffff" />
            <pointLight position={[-3, -2, 2]} intensity={1.2} color="#2980B9" />
            <pointLight position={[0, 3, -2]} intensity={0.8} color="#C0392B" />
            <Environment preset="city" />
            <VibeCan autoRotate={false} />
          </Canvas>

          {/* Floating badges */}
          <div
            className="absolute -left-20 top-16 float-anim"
            style={{ zIndex: 30 }}
          >
            <div className="bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.25)] rounded-2xl px-4 py-2 text-xs font-semibold text-[#00D4FF] whitespace-nowrap backdrop-blur-sm">
              Zero Calories 🌊
            </div>
          </div>
          <div
            className="absolute -right-24 top-32 float-anim-delay"
            style={{ zIndex: 30 }}
          >
            <div className="bg-[rgba(39,174,96,0.1)] border border-[rgba(39,174,96,0.25)] rounded-2xl px-4 py-2 text-xs font-semibold text-green-400 whitespace-nowrap backdrop-blur-sm">
              Clean Ingredients ✓
            </div>
          </div>
        </motion.div>

        {/* Badges */}
        <div ref={badgesRef} className="flex flex-wrap gap-3 justify-center mb-10">
          {['Zero Calories', 'Pure Water', 'Sustainable Can', '355 mL'].map((b) => (
            <div
              key={b}
              className="px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] text-white/60 text-xs font-medium tracking-wider"
            >
              {b}
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div ref={btnsRef} className="flex gap-4 flex-wrap justify-center">
          <Magnet>
            <button className="px-10 py-4 rounded-full font-bold text-sm tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{ background: 'linear-gradient(135deg, #C0392B, #2980B9)' }}
            >
              Shop Now
            </button>
          </Magnet>
          <Magnet>
            <button className="px-10 py-4 rounded-full font-semibold text-sm tracking-wide text-white/80 border border-white/20 bg-transparent transition-all duration-300 hover:border-white/50 hover:-translate-y-1">
              Find a Store
            </button>
          </Magnet>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="mt-14 text-[#00D4FF] text-xs tracking-[0.28em] uppercase"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          ↓ &nbsp; Scroll to feel it
        </motion.div>
      </motion.div>
    </section>
  )
}
