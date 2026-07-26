import styles from './Navbar.module.css'

export interface NavbarProps {
  active?: string
  onChange?: (item: string) => void
}

export function Navbar({ active = 'Серверы', onChange }: NavbarProps) {
  const items = ['Серверы', 'Биллинг', 'Статус']
  return (
    <nav className={styles.root}>
      <strong className="ds-heading-lg">CryptoVPS</strong>
      <div>
        {items.map(item=>(
          <a
            className={item === active ? styles.active : ''}
            href={`#${item}`}
            aria-current={item === active ? 'page' : undefined}
            onClick={event => {
              if (onChange) event.preventDefault()
              onChange?.(item)
            }}
            key={item}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}
