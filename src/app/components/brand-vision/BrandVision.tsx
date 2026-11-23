'use client'

import Image from 'next/image'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './BrandVision.module.css'

export default function BrandVision() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const leftTextRef = useRef<HTMLDivElement | null>(null)
  const rightTextRef = useRef<HTMLDivElement | null>(null)

  const backgroundRef = useRef<HTMLDivElement | null>(null)
  const atmosphereRef = useRef<HTMLDivElement | null>(null)
  const lightBeamRef = useRef<HTMLDivElement | null>(null)

  const workGroupRef = useRef<HTMLDivElement | null>(null)
  const bossRef = useRef<HTMLDivElement | null>(null)
  const modelerRef = useRef<HTMLDivElement | null>(null)
  const tableRef = useRef<HTMLDivElement | null>(null)

  const transitionRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (
        !sectionRef.current ||
        !backgroundRef.current ||
        !atmosphereRef.current ||
        !lightBeamRef.current ||
        !workGroupRef.current ||
        !bossRef.current ||
        !modelerRef.current ||
        !tableRef.current ||
        !leftTextRef.current ||
        !transitionRef.current ||
        !rightTextRef.current
      )
        return

      // Начальное состояние
      gsap.set(backgroundRef.current, {
        scale: 1.14,
      })

      gsap.set(atmosphereRef.current, {
        autoAlpha: 0,
      })

      gsap.set([leftTextRef.current, rightTextRef.current], {
        autoAlpha: 0,
        y: 55,
      })

      gsap.set([bossRef.current, modelerRef.current], {
        autoAlpha: 0,
        y: 80,
      })

      gsap.set(tableRef.current, {
        autoAlpha: 0,
        y: 100,
      })

      gsap.set(lightBeamRef.current, {
        xPercent: -20,
        autoAlpha: 1,
      })
      gsap.set(transitionRef.current, {
        opacity: 1,
        scale: 1.08,
      })

      // Главная анимация сцены
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1900',
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            console.log('BrandVision progress:', self.progress)
          },
        },
      })

      // 1. Проявляется атмосфера
      timeline.to(
        transitionRef.current,
        {
          opacity: 0,
          scale: 1,
          duration: 2.5,
          ease: 'none',
        },
        0,
      )
      timeline.to(
        atmosphereRef.current,
        {
          autoAlpha: 1,
          duration: 1.5,
          ease: 'none',
        },
        0,
      )

      // 2. Камера медленно приближается
      timeline.fromTo(
        backgroundRef.current,
        { scale: 1.2 },
        {
          scale: 1.04,
          duration: 6,
          ease: 'none',
        },
        0,
      )

      // 3. Появляется левый текст
      timeline.to(
        leftTextRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          ease: 'power2.out',
        },
        0.4,
      )

      // 4. Появляется правый текст
      timeline.to(
        rightTextRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          ease: 'power2.out',
        },
        0.9,
      )

      // 5. Появляется владелец
      timeline.to(
        bossRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.6,
          ease: 'power2.out',
        },
        1.3,
      )

      // 6. Появляется дизайнер
      timeline.to(
        modelerRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.6,
          ease: 'power2.out',
        },
        1.6,
      )

      // 7. Появляется рабочий стол
      timeline.to(
        tableRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
        },
        2,
      )

      // 8. Световой луч проходит через мастерскую
      timeline.to(
        lightBeamRef.current,
        {
          xPercent: 35,
          duration: 4,
          ease: 'none',
        },
        1.5,
      )

      // 9. Финальное приближение всей рабочей сцены
      timeline.to(
        workGroupRef.current,
        {
          scale: 1.035,
          yPercent: -1.5,
          duration: 3,
          ease: 'none',
        },
        3,
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.brandVision} id="vision">
      <div className={styles.scene}>
        <div ref={transitionRef} className={styles.transitionOverlay} />
        {/* Room background */}
        <div ref={backgroundRef} className={styles.backgroundLayer}>
          <Image
            src="/images/brand/designRoom/background2.png"
            alt="Lev Shoes design room"
            fill
            sizes="100vw"
          />
        </div>

        {/* Atmosphere */}
        <div ref={atmosphereRef} className={styles.atmosphereLayer}>
          <div ref={lightBeamRef} className={styles.lightBeam} />
          <div className={styles.dustParticle}>
            {Array.from({ length: 16 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
        </div>

        {/* Characters and table */}
        <div ref={workGroupRef} className={styles.workGroup}>
          <div ref={bossRef} className={styles.bossLayer}>
            <Image
              src="/images/brand/designRoom/boss1.png"
              alt="The owner of Lev Shoes"
              fill
              sizes="100vw"
            />
          </div>

          <div ref={modelerRef} className={styles.modelerLayer}>
            <Image
              src="/images/brand/designRoom/modeler7.png"
              alt="The shoe designer"
              fill
              sizes="100vw"
            />
          </div>

          <div ref={tableRef} className={styles.tableLayer}>
            <Image
              src="/images/brand/designRoom/table6.png"
              alt="Design table"
              fill
              sizes="100vw"
            />
          </div>
        </div>

        {/* Text */}
        <div ref={leftTextRef} className={styles.content}>
          <span className={styles.eyebrow}>
            02 / THE VISION BEHIND THE BRAND
          </span>

          <h2>
            A LEGACY OF
            <br />
            <em>ELEGANCE.</em>
          </h2>

          <div className={styles.divider} />

          <p>
            Every great creation begins with a vision. Every detail tells a
            story.
          </p>

          <span className={styles.signature}>Designed to Become Timeless.</span>
        </div>
        <div
          ref={rightTextRef}
          className={`${styles.content} ${styles.contentRight}`}
        >
          <span className={styles.eyebrow}>THE ART OF CREATION</span>

          <h2>
            WHERE IDEAS
            <br />
            <em>TAKE FORM.</em>
          </h2>

          <div className={styles.divider} />

          <p>
            From the first sketch to the finest detail, every creation is shaped
            by experience, imagination and a passion for craftsmanship.
          </p>

          <span className={styles.signature}>Crafted with Purpose.</span>
        </div>
      </div>
    </section>
  )
}
