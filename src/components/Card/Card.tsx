import type { ReactNode } from 'react'
import styles from './Card.module.css'
export function Card({title,children,type='default',state='default'}:{title:string;children:ReactNode;type?:'default'|'accent';state?:'default'|'hover'}){return <section className={`${styles.root} ${styles[type]} ${styles[state]}`}><h3 className="ds-heading-lg">{title}</h3><div className="ds-body-xs">{children}</div></section>}
