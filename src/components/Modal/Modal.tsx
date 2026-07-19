import type { ReactNode } from 'react'
import { Button } from '../Button'
import styles from './Modal.module.css'
export function Modal({title,children}:{title:string;children:ReactNode}){return <section className={styles.root} role="dialog" aria-label={title}><h3 className="ds-heading-xl">{title}</h3><div className="ds-body-sm">{children}</div><footer><Button type="secondary">Отмена</Button><Button>Продолжить</Button></footer></section>}
