'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

import styles from './Collection.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Collection() {
  const collectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = collectionRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        {
          clipPath: 'inset(12% 8% 0% 8% round 18px)',
          y: 80,
          scale: 0.96,
        },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          y: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 25%',
            scrub: 1,
          },
        },
      )

      const shoeImage = section.querySelector(`.${styles.shoeImage}`)

      if (shoeImage) {
        const shoeAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })

        shoeAnimation
          .fromTo(
            shoeImage,
            {
              x: '45%',
              scale: 0.92,
            },
            {
              x: 0,
              scale: 1,
              duration: 0.5,
              ease: 'none',
            },
          )
          .to(shoeImage, {
            x: '45%',
            scale: 0.75,
            duration: 0.55,
            ease: 'none',
          })
      }

      const background = section.querySelector(`.${styles.backgroundImage}`)

      if (background) {
        gsap.to(background, {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={collectionRef} className={styles.collection} id="collection">
      <div className={styles.backgroundImage}></div>
      <div className={styles.content}>
        <span className={styles.eyebrow}>THE ART OF CRAFTSMANSHIP</span>

        <h2>
          Every Detail
          <br />
          <em>Matters.</em>
        </h2>

        <p>Beauty is not simply seen. It is felt in every detail.</p>
      </div>

      <div className={styles.shoePanel}>
        <div className={styles.lightRays}></div>
        <div className={styles.shoeImage}>
          <Image
            src="/models/models-images/boot.png"
            alt="LEV shoe"
            fill
            sizes="(max-width: 768px) 80vw, 55vw"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </section>
  )
}
