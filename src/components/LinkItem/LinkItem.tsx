import type { AnchorHTMLAttributes } from 'react'
import styles from './LinkItem.module.css'
export function LinkItem({children,...props}:AnchorHTMLAttributes<HTMLAnchorElement>){return <a className={styles.root} {...props}><span>{children}</span><i>›</i></a>}
