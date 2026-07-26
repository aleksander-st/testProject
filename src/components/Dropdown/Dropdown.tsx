import { useState } from 'react'
import styles from './Dropdown.module.css'

export interface DropdownItem {
  id: string
  label: string
  destructive?: boolean
}

export interface DropdownProps {
  state?: 'closed' | 'hover' | 'open'
  items?: DropdownItem[]
  highlightedItem?: string
  onAction?: (id: string) => void
  onOpenChange?: (open: boolean) => void
}

const defaultItems: DropdownItem[] = [
  { id: 'reboot', label: 'Перезагрузить' },
  { id: 'console', label: 'Консоль' },
  { id: 'delete', label: 'Удалить', destructive: true },
]

export function Dropdown({
  state = 'closed',
  items = defaultItems,
  highlightedItem,
  onAction,
  onOpenChange,
}: DropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isForcedOpen = state === 'open'
  const isOpen = isForcedOpen || internalOpen

  const setOpen = (open: boolean) => {
    if (!isForcedOpen) setInternalOpen(open)
    onOpenChange?.(open)
  }

  const choose = (id: string) => {
    onAction?.(id)
    setOpen(false)
  }

  return (
    <div className={`${styles.root} ${styles[state]}`}>
      <button
        type="button"
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setOpen(!isOpen)}
      >
        •••
      </button>
      {isOpen && (
        <div className={styles.panel} role="menu">
          {items.map(item => (
            <button
              type="button"
              role="menuitem"
              className={`${item.id === highlightedItem ? styles.highlighted : ''} ${item.destructive ? styles.destructive : ''}`}
              onClick={() => choose(item.id)}
              key={item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
