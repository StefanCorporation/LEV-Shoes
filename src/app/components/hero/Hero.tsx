'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import {
  ShoppingBag,
  Menu,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react'

import styles from './Hero.module.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    image: '/images/hero/45left1.png',
    alt: 'LEV shoe, 45-degree left view',
  },
  {
    image: '/images/hero/right1.png',
    alt: 'LEV shoe, right side view',
  },
  {
    image: '/images/hero/back1.png',
    alt: 'LEV shoe, rear view',
  },
  {
    image: '/images/hero/left1.png',
    alt: 'LEV shoe, left side view',
  },
  {
    image: '/images/hero/top1.png',
    alt: 'LEV shoe, top view',
  },
  {
    image: '/images/hero/down1.png',
    alt: 'LEV shoe, bottom view',
  },
]

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  // Индекс выбранного изображения: 0, 1, 2 или 3.
  const [activeProduct, setActiveProduct] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)

  const transitionTimeline = useRef<gsap.core.Timeline | null>(null)

  const changeProduct = (index: number) => {
    if (index === activeProduct) return

    transitionTimeline.current?.kill()

    const image = heroRef.current?.querySelector(`.${styles.productImage}`)
    const glow = heroRef.current?.querySelector(`.${styles.revealGlow}`)
    const flash = heroRef.current?.querySelector(`.${styles.revealFlash}`)

    if (!image || !glow || !flash) {
      setActiveProduct(index)
      return
    }

    transitionTimeline.current = gsap.timeline()

    transitionTimeline.current
      .to(image, {
        opacity: 0,
        scale: 0.72,
        filter: 'blur(12px)',
        duration: 0.4,
        ease: 'power2.in',
      })
      .to(
        glow,
        {
          opacity: 1,
          scale: 1.5,
          duration: 0.35,
        },
        '<',
      )
      .to(
        flash,
        {
          opacity: 0.95,
          duration: 0.15,
        },
        '<0.1',
      )
      .call(() => {
        setActiveProduct(index)
      })
      .to(flash, {
        opacity: 0,
        duration: 0.5,
      })
      .to(
        glow,
        {
          opacity: 0,
          scale: 0.7,
          duration: 0.7,
        },
        '<',
      )
  }

  const nextProduct = () => {
    changeProduct((activeProduct + 1) % products.length)
  }

  const previousProduct = () => {
    changeProduct((activeProduct - 1 + products.length) % products.length)
  }

  useLayoutEffect(() => {
    const image = imageRef.current

    if (!image) return

    gsap.fromTo(
      image,
      {
        opacity: 0,
        scale: 0.78,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
      },
    )
  }, [activeProduct])

  useLayoutEffect(() => {
    const hero = heroRef.current

    if (!hero) return

    const ctx = gsap.context(() => {
      gsap.set('.hero-brand, .hero-navigation, .hero-copy > *', {
        autoAlpha: 0,
      })
      // Золотое свечение работает как раньше
      gsap.to('.hero-glow', {
        opacity: 0.65,
        scale: 1.12,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, hero)

    // Запускаем вступительную анимацию после Preloader
    const startIntro = () => {
      ctx.add(() => {
        const intro = gsap.timeline({
          defaults: { ease: 'power3.out' },
        })

        intro
          .fromTo(
            '.hero-brand',
            { autoAlpha: 0, y: 45 },
            { autoAlpha: 1, y: 0, duration: 1.2 },
          )
          .fromTo(
            '.hero-navigation',
            { autoAlpha: 0, y: -20 },
            { autoAlpha: 1, y: 0, duration: 0.9 },
            '-=0.8',
          )
          .fromTo(
            '.hero-copy > *',
            { autoAlpha: 0, y: 45 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.18,
              duration: 1,
            },
            '-=0.5',
          )
      })
    }

    window.addEventListener('loadingComplete', startIntro, { once: true })

    // Анимация Hero при прокрутке
    const mm = gsap.matchMedia()

    mm.add('(min-width: 761px)', () => {
      const transition = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      transition
        .to(
          '.hero-product',
          {
            scale: 1.35,
            y: 70,
            duration: 1,
          },
          0,
        )
        .to(
          '.hero-copy',
          {
            opacity: 0,
            x: -80,
            duration: 0.5,
          },
          0,
        )
      transition
        .fromTo(
          '.hero-navigation, .hero-brand, .hero-bottom',
          {
            opacity: 1,
            y: 0,
          },
          {
            opacity: 0,
            y: -25,
            duration: 0.4,
            immediateRender: false,
          },
          0,
        )
        .to(
          '.hero-background',
          {
            scale: 1.08,
            opacity: 0.35,
            duration: 1,
          },
          0,
        )
    })

    return () => {
      window.removeEventListener('loadingComplete', startIntro)
      mm.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section className={styles.hero} id="home" ref={heroRef}>
      {/* Фоновая фотография и затемнение */}
      <div className={`${styles.background} hero-background`}>
        <Image
          src="/images/hero/background.png"
          alt="background"
          fill
          priority
          sizes="100vw"
          className={styles.backgroundImage}
        />
      </div>

      {/* Верхняя навигация */}
      <header className={styles.header}>
        <a href="#home" className={`${styles.brand} hero-brand`}>
          <Image
            src="/images/brand/logo.png"
            alt="LEV golden lion emblem"
            width={110}
            height={145}
            priority
          />

          <span className={styles.brandName}>
            LEV
            <small>SHOES</small>
          </span>
        </a>

        <nav className={`${styles.navigation} hero-navigation`}>
          <a className={styles.activeLink} href="#home">
            HOME
          </a>
          <a href="#collection">COLLECTION</a>
          <a href="#story">OUR STORY</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <div className={styles.headerActions}>
          <button aria-label="Shopping bag">
            <ShoppingBag />
          </button>

          <button aria-label="Open menu">
            <Menu />
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={`${styles.copy} hero-copy`}>
          <span className={styles.eyebrow}>
            <span />
            SIGNATURE COLLECTION
          </span>

          <h1>
            Timeless
            <br />
            <em>Elegance</em>
          </h1>

          <p>
            A masterpiece
            <br />
            in every detail.
          </p>

          <a href="#collection" className={styles.cta}>
            DISCOVER THE COLLECTION
            <span>→</span>
          </a>
        </div>

        <div className={`${styles.product} hero-product`}>
          <div className={`${styles.orbit} hero-orbit`}>
            <span className={styles.orbitPoint} />
          </div>

          <div className={`${styles.productDisplay}`}>
            <Image
              ref={imageRef}
              key={products[activeProduct].image}
              src={products[activeProduct].image}
              alt={products[activeProduct].alt}
              fill
              priority
              sizes="(max-width: 760px) 85vw, 50vw"
              className={styles.productImage}
            />

            <div className={styles.revealGlow} />
            <div className={styles.revealFlash} />
          </div>

          <div className={styles.rotationLabel}>
            <span>↶</span>
            360°
            <span>↷</span>
          </div>
        </div>

        <div className={styles.thumbnails}>
          {products.map((product, index) => (
            <button
              key={product.image}
              className={
                activeProduct === index
                  ? styles.thumbnailActive
                  : styles.thumbnail
              }
              onClick={() => changeProduct(index)}
              aria-label={`Show shoe view ${index + 1}`}
              aria-pressed={activeProduct === index}
            >
              <Image src={product.image} alt="" fill sizes="100px" />
            </button>
          ))}
        </div>
      </div>

      {/* Нижняя информационная панель */}
      <footer className={`${styles.bottom} hero-bottom`}>
        <div className={styles.location}>
          <span>ITALIAN HERITAGE</span>
          <div className={styles.locationLine} />

          <p>
            <MapPin />
            {`GEORGIA · WOMEN'S COLLECTIO`}
          </p>
        </div>

        <a className={styles.scroll} href="#collection">
          SCROLL
          <span>↓</span>
        </a>

        <div className={styles.galleryControls}>
          <span>
            {String(activeProduct + 1).padStart(2, '0')} /{' '}
            {String(products.length).padStart(2, '0')}
          </span>

          <button onClick={previousProduct} aria-label="Previous shoe view">
            <ChevronLeft />
          </button>

          <button onClick={nextProduct} aria-label="Next shoe view">
            <ChevronRight />
          </button>
        </div>
      </footer>
    </section>
  )
}
