import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Nav from './components/Nav'
import HeroSection from './components/sections/HeroSection'
import BenefitsSection from './components/sections/BenefitsSection'
import FlavorsSection from './components/sections/FlavorsSection'
import StorySection from './components/sections/StorySection'
import FooterSection from './components/sections/FooterSection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Init Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-[#0C0C0C] min-h-screen overflow-x-hidden">
      <Nav />

      <main>
        <section id="hero">
          <HeroSection />
        </section>

        {/* Section divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        <section id="benefits">
          <BenefitsSection />
        </section>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        <section id="flavors">
          <FlavorsSection />
        </section>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        <section id="story">
          <StorySection />
        </section>
      </main>

      <section id="footer">
        <FooterSection />
      </section>
    </div>
  )
}
