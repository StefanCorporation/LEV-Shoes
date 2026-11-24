'use client'

import Image from 'next/image'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './BrandCutting.module.css'

export default function BrandCutting() {
  const sectionRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const cutterRef = useRef<HTMLDivElement>(null)
  const cutterRaisedRef = useRef<HTMLImageElement>(null)
  const cutterDownRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=2200',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Начальные состояния
      gsap.set(backgroundRef.current, {
        scale: 1.12,
      })

      gsap.set(tableRef.current, {
        yPercent: 12,
      })

      gsap.set(cutterRef.current, {
        autoAlpha: 0,
        xPercent: -15,
      })

      gsap.set(contentRef.current, {
        autoAlpha: 0,
        x: 70,
        filter: 'blur(12px)',
      })

      gsap.set(cutterRaisedRef.current, {
        opacity: 0,
      })

      gsap.set(cutterDownRef.current, {
        opacity: 1,
      })

      gsap.set(cutterRaisedRef.current, {
        opacity: 0,
      })

      // Мерцание фабричных ламп
      gsap.to(`.${styles.lampOne}`, {
        opacity: 0.85,
        duration: 0.12,
        repeat: -1,
        yoyo: true,
        repeatDelay: 2.2,
      })

      gsap.to(`.${styles.lampTwo}`, {
        opacity: 0.65,
        duration: 0.18,
        repeat: -1,
        yoyo: true,
        repeatDelay: 3.1,
      })

      gsap.to(`.${styles.lampThree}`, {
        opacity: 0.9,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        repeatDelay: 4,
      })

      // 1. Камера постепенно открывает мастерскую
      timeline.to(
        backgroundRef.current,
        {
          scale: 1,
          duration: 5,
          ease: 'none',
        },
        0,
      )

      // 2. Стол выдвигается на передний план
      timeline.to(
        tableRef.current,
        {
          yPercent: 0,
          duration: 3,
          ease: 'power2.out',
        },
        0.5,
      )

      // 3. Появляется кройщик
      timeline.to(
        cutterRef.current,
        {
          autoAlpha: 1,
          xPercent: 0,
          duration: 2,
          ease: 'power2.out',
        },
        0.5,
      )

      // 4. Проявляется текст справа
      timeline.to(
        contentRef.current,
        {
          autoAlpha: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1.8,
          ease: 'power2.out',
        },
        2.5,
      )

      // 5. Кройщик постепенно поднимает голову

      timeline.to(
        cutterRaisedRef.current,
        {
          opacity: 1,
          duration: 2,
          ease: 'sine.inOut',
        },
        4.5,
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.brandCutting} id="cutting">
      {/* Фон мастерской */}
      <div className={styles.scene}>
        <div ref={backgroundRef} className={styles.backgroundLayer}>
          <Image
            src="/images/brand/fabric/background.jpeg"
            alt="Leather cutting workshop"
            fill
            priority={false}
            sizes="100vw"
          />
        </div>

        {/* Свет от фабричных ламп */}
        <div className={`${styles.lamp} ${styles.lampOne}`} />
        <div className={`${styles.lamp} ${styles.lampTwo}`} />
        <div className={`${styles.lamp} ${styles.lampThree}`} />

        {/* Пыль в воздухе */}
        <div className={styles.dustLayer} aria-hidden="true">
          {Array.from({ length: 55 }).map((_, i) => (
            <span key={i} className={styles.dustParticle} />
          ))}
        </div>

        {/* Рабочий стол */}
        <div ref={tableRef} className={styles.tableLayer}>
          <Image
            src="/images/brand/fabric/table1.png"
            alt="Leather cutting workbench"
            fill
            sizes="100vw"
          />
        </div>

        {/* Кройщик */}
        <div ref={cutterRef} className={styles.cutterLayer}>
          {/* Первый кадр — голова опущена */}
          <Image
            ref={cutterDownRef}
            src="/images/brand/fabric/cutter3.png"
            alt="Leather cutter looking down"
            fill
            sizes="100vw"
            className={styles.cutterFrame}
          />

          {/* Второй кадр — голова поднята */}
          <Image
            ref={cutterRaisedRef}
            src="/images/brand/fabric/head6.png"
            alt="Leather cutter looking at camera"
            fill
            sizes="100vw"
            className={styles.cutterFrameRaised}
          />
        </div>

        {/* Текстовая композиция */}
        <div ref={contentRef} className={styles.content}>
          <span className={styles.eyebrow}>THE ART OF PRECISION</span>

          <h2>Every detail begins with precision.</h2>

          <p>
            Carefully selected leather. Exact measurements. Skilled hands
            shaping the foundation of every masterpiece.
          </p>

          <span className={styles.signature}>
            CRAFTED WITH PURPOSE · MADE TO LAST
          </span>
        </div>
      </div>
    </section>
  )
}
