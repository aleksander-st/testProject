import { Card, LinkItem } from '../components'
import { handleInternalLink } from '../navigation'
import { screens } from './registry'
import styles from './ScreensIndex.module.css'

export function ScreensIndex() {
  return (
    <main className={styles.page}>
      <div className={styles.intro}>
        <p className="ds-label-xs">CRYPTO VPS</p>
        <h1 className="ds-heading-3xl">CryptoVPS — экраны</h1>
        <p className="ds-body-base">
          Статичные экраны, собранные из дизайн-системы. Логика и данные — отдельный шаг.
        </p>
      </div>

      <section className={styles.grid} aria-label="Собранные экраны">
        {screens.map(screen => (
          <a
            className={styles.screenLink}
            href={screen.route}
            key={screen.id}
            onClick={event => handleInternalLink(event, screen.route)}
          >
            <Card title={screen.name} type="interactive">
              <span>{screen.description}</span>
              <code>{screen.route}</code>
            </Card>
          </a>
        ))}
      </section>

      <footer className={styles.footer}>
        <LinkItem href="/showcase">Открыть Showcase</LinkItem>
        <LinkItem href="http://127.0.0.1:6006/">Открыть Storybook</LinkItem>
      </footer>
    </main>
  )
}
