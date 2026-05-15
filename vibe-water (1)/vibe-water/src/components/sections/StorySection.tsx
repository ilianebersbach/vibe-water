import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import VibeCan from '../VibeCan'
import Magnet from '../Magnet'

gsap.registerPlugin(ScrollTrigger)

const marqueeItems = [
  'ZERO CALORIES', '✦', 'PURE WATER', '✦', '12 FL OZ', '✦',
  'JUST A VIBE', '✦', 'BORN IN MIAMI', '✦', 'SUSTAINABLE CAN', '✦',
  'ZERO CALORIES', '✦', 'PURE WATER', '✦', '12 FL OZ', '✦',
  'JUST A VIBE', '✦', 'BORN IN MIAMI', '✦', 'SUSTAINABLE CAN', '✦',
]

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const canRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text stagger reveal
      const textEls = textRef.current?.querySelectorAll('.story-reveal')
      if (textEls) {
        gsap.from(textEls, {
          opacity: 0,
          y: 60,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Can parallax
      gsap.from(canRef.current, {
        opacity: 0,
        x: 80,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: canRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
      gsap.to(canRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Stats counter
      const nums = statsRef.current?.querySelectorAll('.stat-num')
      if (nums) {
        gsap.from(nums, {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
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
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #060c14 0%, #0a1628 50%, #0C0C0C 100%)',
      }}
    >
      <div className="film-grain" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse, rgba(41,128,185,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Text side */}
        <div ref={textRef}>
          <div className="story-reveal text-[#00D4FF] text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Our Story
          </div>
          <h2
            className="story-reveal font-black leading-[0.92] tracking-[-0.03em] mb-8"
            style={{
              fontSize: 'clamp(38px, 5vw, 64px)',
              background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.5) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Born in Miami.<br />Crafted for<br />everyone.
          </h2>
          <p className="story-reveal text-white/55 font-light text-base leading-[1.85] tracking-wide mb-6">
            We believe hydration shouldn't be boring, and healthy doesn't have to mean bland. Vibe Water started with one simple idea: water is the most powerful drink on the planet — it deserves better packaging, better presentation, and a whole lot more attitude.
          </p>
          <p className="story-reveal text-white/40 font-light text-base leading-[1.85] tracking-wide mb-12">
            No additives. No sweeteners. No compromise. Just pure, clean water in a can that looks as good as it makes you feel.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="flex gap-10 mb-12">
            {[
              { num: '0', label: 'Calories' },
              { num: '100%', label: 'Pure water' },
              { num: '∞', label: 'Recyclable' },
            ].map((s) => (
              <div key={s.label}>
                <div className="stat-num text-[#00D4FF] font-black tracking-[-0.04em]" style={{ fontSize: 38 }}>
                  {s.num}
                </div>
                <div className="text-white/35 text-xs font-medium tracking-[0.2em] uppercase mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="story-reveal flex gap-4 flex-wrap">
            <Magnet>
              <button
                className="px-10 py-4 rounded-full font-bold text-sm tracking-wide text-white transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, #C0392B, #2980B9)' }}
              >
                Shop Now
              </button>
            </Magnet>
            <Magnet>
              <button className="px-10 py-4 rounded-full font-semibold text-sm tracking-wide text-white/75 border border-white/20 bg-transparent transition-all duration-300 hover:border-white/45 hover:-translate-y-1">
                Learn More
              </button>
            </Magnet>
          </div>
        </div>

        {/* Can side */}
        <div ref={canRef} className="relative flex justify-center items-center">
          {/* Ground glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 rounded-full pulse-glow"
            style={{
              background: 'radial-gradient(ellipse, rgba(41,128,185,0.35) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
          {/* Smoke rings */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
              style={{
                width: 180 + i * 60,
                height: 30 + i * 10,
                background: `radial-gradient(ellipse, rgba(41,128,185,${0.08 - i * 0.02}) 0%, transparent 70%)`,
                filter: 'blur(12px)',
              }}
            />
          ))}
          <div style={{ width: 240, height: 460 }}>
            <Canvas camera={{ position: [0, 0, 3.4], fov: 42 }} style={{ width: 240, height: 460 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[4, 5, 3]} intensity={3} color="#ffffff" />
              <pointLight position={[-3, -2, 2]} intensity={1.5} color="#2980B9" />
              <pointLight position={[2, 3, -2]} intensity={0.8} color="#C0392B" />
              <pointLight position={[0, -3, 1]} intensity={0.5} color="#00D4FF" />
              <Environment preset="city" />
              <VibeCan autoRotate={true} scale={1.05} />
            </Canvas>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div
        className="relative z-10 overflow-hidden border-t border-b py-4"
        style={{
          borderColor: 'rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.015)',
          transform: 'rotate(-1deg) scaleX(1.05)',
        }}
      >
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="mx-8 text-xs font-bold tracking-[0.28em] uppercase whitespace-nowrap"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div style={{ paddingBottom: 80 }} />
    </section>
  )
}
