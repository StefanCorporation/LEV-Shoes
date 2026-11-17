import styles from './Navigation.module.css'

const navigationLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Collection', href: '#collection' },
  { label: 'Our Story', href: '#story' },
  { label: 'Contact', herf: '#contact' },
]

export default function Navigation() {
  return (
    <header className={styles.header}>
      <a href="#home" className={styles.logo}>
        Lev<span>SHOES</span>
      </a>

      <nav className={styles.nav}>
        {navigationLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <button className={styles.menuButton} aria-label="Open menu">
        <span></span>
        <span></span>
      </button>
    </header>
  )
}
