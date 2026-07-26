import type { ReactNode } from 'react'
import styles from './Card.module.css'

export interface CardProps {
  title: string
  children: ReactNode
  type?: 'static' | 'interactive'
  state?: 'default' | 'hover'
}

export function Card({ title, children, type = 'static', state = 'default' }: CardProps) {
  return (
    <article className={`${styles.root} ${styles[type]} ${styles[state]}`}>
      <h3 className="ds-heading-lg">{title}</h3>
      <div className="ds-body-xs">{children}</div>
    </article>
  )
}
