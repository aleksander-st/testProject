import styles from './Pagination.module.css'

export interface PaginationProps {
  active?: number
  hovered?: number
  total?: number
  onChange?: (page: number) => void
}

type PaginationItem = number | '…'

function getItems(active: number, total: number): PaginationItem[] {
  if (total <= 5) return Array.from({ length: total }, (_, index) => index + 1)
  if (active <= 3) return [1, 2, 3, '…', total]
  if (active >= total - 2) return [1, '…', total - 2, total - 1, total]
  return [1, '…', active, '…', total]
}

export function Pagination({ active = 2, hovered, total = 12, onChange }: PaginationProps) {
  const items = getItems(active, total)

  return (
    <nav className={styles.root} aria-label="Пагинация">
      <button
        type="button"
        disabled={active <= 1}
        aria-label="Предыдущая страница"
        onClick={() => onChange?.(Math.max(1, active - 1))}
      >
        ‹
      </button>
      {items.map((item, index) => item === '…' ? (
        <span className={styles.ellipsis} key={`${item}-${index}`}>…</span>
      ) : (
        <button
          type="button"
          aria-current={item === active ? 'page' : undefined}
          aria-label={`Страница ${item}`}
          className={`${item === active ? styles.active : ''} ${item === hovered ? styles.hover : ''}`}
          onClick={() => onChange?.(item)}
          key={`${item}-${index}`}
        >
          {item}
        </button>
      ))}
      <button
        type="button"
        disabled={active >= total}
        aria-label="Следующая страница"
        onClick={() => onChange?.(Math.min(total, active + 1))}
      >
        ›
      </button>
    </nav>
  )
}
