import type { ButtonHTMLAttributes } from 'react'
import styles from './IconButton.module.css'

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'primary' | 'secondary'
  state?: 'default' | 'hover' | 'disabled'
  label: string
}

export function IconButton({ type = 'primary', state = 'default', label, className = '', disabled, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`${styles.root} ${styles[type]} ${styles[state]} ${className}`}
      disabled={disabled || state === 'disabled'}
      {...props}
    >
      <span className={styles.placeholder} />
    </button>
  )
}
