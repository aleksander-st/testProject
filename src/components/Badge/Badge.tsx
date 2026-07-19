import styles from './Badge.module.css'
export type BadgeVariant='success'|'warning'|'error'|'neutral'
export function Badge({variant='neutral',children}:{variant?:BadgeVariant;children:string}){return <span className={`${styles.root} ${styles[variant]}`}><i/>{children}</span>}
