import type { ButtonHTMLAttributes } from 'react'
import styles from './OptionCard.module.css'

export interface OptionCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  title: string
  description: string
  state?: 'default' | 'selected'
}

export function OptionCard({ title, description, state = 'default', className = '', ...props }: OptionCardProps) {
  return (
    <button
      type="button"
      className={`${styles.root} ${styles[state]} ${className}`}
      aria-pressed={state === 'selected'}
      {...props}
    >
      <i />
      <span><strong>{title}</strong><small>{description}</small></span>
    </button>
  )
}
