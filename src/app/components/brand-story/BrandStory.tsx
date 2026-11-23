'use client'

import Image from 'next/image'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './BrandStory.module.css'

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const shoemakerRef = useRef<HTMLDivElement>(null)
  const armRef = useRef<HTMLDivElement>(null)
  const workGroupRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const atmosphereRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const background = backgroundRef.current
    const workGroup = workGroupRef.current
    const arm = armRef.current

    if (!section || !background || !workGroup || !arm) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2200',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
      gsap.set(contentRef.current, {
        autoAlpha: 0,
        y: 60,
        filter: 'blur(10px)',
      })
      timeline.to(
        contentRef.current,
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power2.out',
        },
        0.5,
      )

      // 1. Камера приближается к мастерской
      timeline.to(
        background,
        {
          scale: 1.16,
          xPercent: -3,
          duration: 3,
          ease: 'none',
        },
        0,
      )

      // 2. Мастер постепенно приближается
      timeline.to(
        workGroup,
        {
          scale: 1.08,
          yPercent: -3,
          duration: 3,
          ease: 'none',
        },
        0,
      )

      // 3. Рука поднимается и наносит удар
      timeline
        .to(
          arm,
          {
            rotation: -25,
            duration: 1,
            ease: 'power1.inOut',
          },
          1.5,
        )
        .to(arm, {
          rotation: 15,
          duration: 0.25,
          ease: 'power2.in',
        })
        .to(arm, {
          rotation: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.brandStory} id="story">
      <div className={styles.scene}>
        {/* Layer 1 — Workshop background */}
        <div ref={backgroundRef} className={styles.backgroundLayer}>
          <Image
            src="/images/brand/mastery/workshopT.png"
            alt="Traditional shoemaking workshop"
            fill
            priority={false}
            sizes="100vw"
          />
        </div>

        {/* Atmospheric effects — sunlight and dust */}
        <div ref={atmosphereRef} className={styles.atmosphereLayer}>
          <div className={styles.lightBeam} />

          <div className={styles.dustParticle}>
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>

        {/* Foreground camera group */}
        <div ref={workGroupRef} className={styles.workGroup}>
          {/* Layer 2 — Shoemaker */}
          <div ref={shoemakerRef} className={styles.shoemakerLayer}>
            <Image
              src="/images/brand/mastery/shoemaker.png"
              alt="Shoemaker working at his bench"
              fill
              sizes="100vw"
            />
          </div>

          {/* Layer 3 — Workbench */}
          <div ref={tableRef} className={styles.tableLayer}>
            <Image
              src="/images/brand/mastery/table5.png"
              alt="Traditional shoemaker workbench with tools"
              fill
              sizes="100vw"
            />
          </div>

          {/* Layer 4 — Arm pivot */}
          <div className={styles.armPivot}>
            <div ref={armRef} className={styles.armLayer}>
              <Image
                src="/images/brand/mastery/hend.png"
                alt="Shoemaker's hand holding a hammer"
                fill
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        {/* Text overlay */}
        <div ref={contentRef} className={styles.content}>
          <span className={styles.eyebrow}>01 / THE ART OF CRAFTSMANSHIP</span>

          <h2>
            CRAFTED TO
            <br />
            BE <em>TIMELESS.</em>
          </h2>

          <div className={styles.divider} />

          <p>
            True elegance is never about following trends. It is about creating
            something that remains beautiful beyond time.
          </p>

          <span className={styles.signature}>The Art of Every Step.</span>
        </div>
      </div>
    </section>
  )
}
