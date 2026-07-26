import styles from './Tabs.module.css'

export interface TabsProps {
  items: string[]
  active: string
  hovered?: string
  onChange?: (item: string) => void
}

export function Tabs({ items, active, hovered, onChange }: TabsProps) {
  return (
    <div className={styles.root} role="tablist">
      {items.map(item => (
        <button
          type="button"
          role="tab"
          aria-selected={item === active}
          className={`${item === active ? styles.active : ''} ${item === hovered ? styles.hover : ''}`}
          onClick={() => onChange?.(item)}
          key={item}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
