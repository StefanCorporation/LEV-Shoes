'use client'

import { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('loadingComplete'))
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className={styles.preloader}>
      <div className={styles.content}>
        <div className={styles.logo}>LEV</div>
        <span className={styles.subtitle}>SHOES</span>

        <div className={styles.progress}>
          <div className={styles.progressBar} />
        </div>

        <p className={styles.caption}>CRAFTING YOUR EXPERIENCE</p>
      </div>
    </div>
  )
}
