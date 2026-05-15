import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import VibeCan from '../VibeCan'
import TextRoll from '../ui/text-roll'
import Magnet from '../Magnet'
import { products } from '../../data/products'

gsap.registerPlugin(ScrollTrigger)

export default function FlavorsSection() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const activeProduct = products[active]

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 md:px-12 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${activeProduct.glowColor.replace('0.4', '0.06')} 0%, transparent 60%)`,
        }}
      />

      <div ref={headingRef} className="text-center mb-16 max-w-2xl mx-auto">
        <div className="text-[#00D4FF] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          The Lineup
        </div>
        <h2
          className="font-black leading-[0.92] tracking-[-0.03em] hero-heading"
          style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
        >
          Find your vibe.
        </h2>
      </div>

      {/* Flavor selector tabs */}
      <div className="flex justify-center gap-3 mb-16 flex-wrap">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            className="px-6 py-2 rounded-full text-sm font-semibold tracking-wider transition-all duration-400 border"
            style={{
              background: active === i
                ? `linear-gradient(135deg, ${p.colorTop}, ${p.colorBottom})`
                : 'rgba(255,255,255,0.04)',
              borderColor: active === i ? 'transparent' : 'rgba(255,255,255,0.1)',
              color: '#fff',
              transform: active === i ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* 3D Can Carousel */}
      <div className="flex gap-6 justify-center items-end mb-16 flex-wrap">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            className="relative cursor-pointer"
            style={{
              width: active === i ? 200 : 150,
              height: active === i ? 380 : 300,
              transition: 'width 0.5s ease, height 0.5s ease',
            }}
            animate={{
              scale: active === i ? 1 : 0.82,
              opacity: active === i ? 1 : 0.45,
            }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            onClick={() => setActive(i)}
            whileHover={{ opacity: active === i ? 1 : 0.7 }}
          >
            {/* Glow ring on active */}
            {active === i && (
              <div
                className="absolute inset-0 rounded-full pointer-events-none pulse-glow"
                style={{
                  background: `radial-gradient(ellipse at 50% 80%, ${p.glowColor} 0%, transparent 70%)`,
                  zIndex: 0,
                }}
              />
            )}
            <Canvas
              camera={{ position: [0, 0, 3.2], fov: 45 }}
              style={{ width: '100%', height: '100%' }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[3, 4, 3]} intensity={2} color="#ffffff" />
              <pointLight position={[-2, -1, 2]} intensity={1} color={p.colorBottom} />
              <pointLight position={[0, 2, -1]} intensity={0.6} color={p.colorTop} />
              <Environment preset="city" />
              <VibeCan
                colorTop={p.colorTop}
                colorBottom={p.colorBottom}
                autoRotate={true}
                hovered={active === i}
              />
            </Canvas>

            {/* Label below can */}
            <motion.div
              className="absolute -bottom-12 left-0 right-0 text-center"
              animate={{ opacity: active === i ? 1 : 0.4 }}
            >
              <div
                className="text-base font-800 tracking-wide"
                style={{ color: active === i ? p.accentColor : 'rgba(255,255,255,0.5)' }}
              >
                {p.name}
              </div>
              <div className="text-xs text-white/30 font-300 tracking-wider mt-1">
                {p.tagline}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Active product info */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg mx-auto mt-20 mb-12"
      >
        <div
          className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-4 border"
          style={{
            color: activeProduct.accentColor,
            borderColor: `${activeProduct.accentColor}40`,
            background: `${activeProduct.accentColor}15`,
          }}
        >
          {activeProduct.name}
        </div>
        <p className="text-white/50 font-light text-base tracking-wide">
          {activeProduct.tagline} &nbsp;·&nbsp; 0 calories &nbsp;·&nbsp; 12 FL OZ
        </p>
      </motion.div>

      {/* TextRoll nav */}
      <div className="flex justify-center gap-12 flex-wrap">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            className="font-black uppercase tracking-[-0.02em] overflow-hidden"
            style={{ fontSize: 'clamp(24px, 4vw, 40px)', lineHeight: 0.9 }}
          >
            <TextRoll
              className="font-black uppercase"
              style={{ color: active === i ? p.accentColor : 'rgba(255,255,255,0.2)' } as React.CSSProperties}
            >
              {p.name}
            </TextRoll>
          </button>
        ))}
      </div>

      {/* Shop CTA */}
      <div className="flex justify-center mt-16">
        <Magnet>
          <button
            className="px-12 py-4 rounded-full font-bold text-sm tracking-wide text-white transition-all duration-300 hover:-translate-y-1"
            style={{ background: `linear-gradient(135deg, ${activeProduct.colorTop}, ${activeProduct.colorBottom})` }}
          >
            Shop {activeProduct.name}
          </button>
        </Magnet>
      </div>
    </section>
  )
}
