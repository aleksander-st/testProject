import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonType = 'primary' | 'secondary' | 'ghost'
export type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled' | 'error'
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> { type?: ButtonType; state?: ButtonState; children: ReactNode }
export function Button({ type = 'primary', state = 'default', disabled, children, className = '', ...props }: ButtonProps) {
  return <button type="button" className={`${styles.root} ${styles[type]} ${styles[state]} ${className}`} disabled={disabled || state === 'disabled'} {...props}>{children}</button>
}
