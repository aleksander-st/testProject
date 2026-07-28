import { ChevronDown, Server } from 'lucide-react'
import { handleInternalLink } from '../../navigation'
import styles from './ProductHeader.module.css'

export function ProductHeader() {
  return (
    <header className={styles.header}>
      <a
        className={styles.brand}
        href="/dashboard"
        onClick={event => handleInternalLink(event, '/dashboard')}
      >
        <Server aria-hidden="true" />
        <span className="ds-heading-lg">CryptoVPS</span>
      </a>

      <nav className={styles.navigation} aria-label="Основная навигация">
        <a
          className={styles.activeNav}
          href="/dashboard"
          onClick={event => handleInternalLink(event, '/dashboard')}
        >
          Серверы
        </a>
        <span>Биллинг</span>
        <span>Статус</span>
      </nav>

      <div className={styles.user}>
        <span className={styles.avatar}>A</span>
        <span>anton@mail.ru</span>
        <ChevronDown aria-hidden="true" />
      </div>
    </header>
  )
}
