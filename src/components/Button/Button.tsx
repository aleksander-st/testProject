import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonType = 'primary' | 'secondary' | 'ghost'
export type ButtonState = 'default' | 'hover' | 'disabled' | 'loading' | 'focus'
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: ButtonType
  state?: ButtonState
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  children: ReactNode
}

export function Button({ type = 'primary', state = 'default', htmlType = 'button', disabled, children, className = '', ...props }: ButtonProps) {
  const isLoading = state === 'loading'
  const isDisabled = disabled || state === 'disabled'

  return (
    <button
      type={htmlType}
      className={`${styles.root} ${styles[type]} ${styles[state]} ${className}`}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <span className={styles.loadingMark} aria-hidden="true" />
          <span className={styles.visuallyHidden}>{children}</span>
        </>
      ) : children}
    </button>
  )
}
