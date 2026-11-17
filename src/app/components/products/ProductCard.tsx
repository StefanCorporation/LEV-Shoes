import Image from 'next/image'
import styles from './ProductCard.module.css'

type ProductCardProps = {
  name: string
  price: number
  image: string
  label: string
  featured?: boolean
}

export default function ProductCard({
  name,
  price,
  image,
  label,
  featured = false,
}: ProductCardProps) {
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.imageWrapper}>
        <span className={styles.label}>{label}</span>

        <Image
          src={image}
          alt={name}
          fill
          sizes={
            featured
              ? '(max-width: 768px) 90vw, 50vw'
              : '(max-width: 768px) 90vw, 24vw'
          }
          loading="lazy"
          className={styles.productImage}
        />

        <button className={styles.viewButton}>
          VIEW PRODUCT
          <span>↗</span>
        </button>
      </div>

      <div className={styles.productInfo}>
        <h3>{name}</h3>
        <span>₾{price}</span>
      </div>
    </article>
  )
}
