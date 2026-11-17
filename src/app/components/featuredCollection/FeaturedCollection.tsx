'use client'

import { useState, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './FeaturedCollection.module.css'
import ProductCard from '../products/ProductCard'

type Category = 'women' | 'men'

type Product = {
  id: number
  name: string
  price: number
  image: string
  category: Category
  label: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Elegance Heel',
    price: 289,
    image: '/images/products/vitrin/vitin.webp',
    category: 'women',
    label: 'NEW ARRIVAL',
  },
  {
    id: 2,
    name: 'Classic Leather',
    price: 349,
    image: '/images/products/vitrin/leather.webp',
    category: 'women',
    label: 'BESTSELLER',
  },
  {
    id: 3,
    name: 'Modern Silhouette',
    price: 259,
    image: '/images/products/vitrin/modern.webp',
    category: 'women',
    label: 'LIMITED',
  },
  {
    id: 4,
    name: 'Classic Oxford',
    price: 329,
    image: '/images/products/vitrin/oxford.webp',
    category: 'men',
    label: 'NEW ARRIVAL',
  },
  {
    id: 5,
    name: 'Urban Leather',
    price: 299,
    image: '/images/products/vitrin/boots.webp',
    category: 'men',
    label: 'BESTSELLER',
  },
  {
    id: 6,
    name: 'Essential Derby',
    price: 279,
    image: '/images/products/vitrin/green.webp',
    category: 'men',
    label: 'LIMITED',
  },
]

export default function FeaturedCollection() {
  const [category, setCategory] = useState<Category>('women')

  const sectionRef = useRef<HTMLElement>(null)

  const filteredProducts = products.filter(
    (product) => product.category === category,
  )

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('article')

      gsap.fromTo(
        cards,
        {
          y: 35,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'transform,opacity,visibility',
        },
      )
    }, section)

    return () => ctx.revert()
  }, [category])

  return (
    <section
      className={styles.featuredCollection}
      id="featured"
      ref={sectionRef}
    >
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>DISCOVER THE COLLECTION</span>

          <h2>
            Designed to <em>be remembered.</em>
          </h2>
        </div>

        <button className={styles.viewAll}>
          VIEW ALL
          <span>↗</span>
        </button>
      </div>

      <div className={styles.categories}>
        <button
          className={category === 'women' ? styles.active : ''}
          onClick={() => setCategory('women')}
        >
          WOMEN
        </button>

        <button
          className={category === 'men' ? styles.active : ''}
          onClick={() => setCategory('men')}
        >
          MEN
        </button>
      </div>

      <div className={styles.products}>
        {filteredProducts.length > 0 && (
          <>
            <ProductCard {...filteredProducts[0]} featured />

            <div className={styles.secondaryProducts}>
              {filteredProducts.slice(1).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
