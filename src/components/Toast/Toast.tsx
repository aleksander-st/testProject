import styles from './Toast.module.css'
export type ToastVariant='success'|'warning'|'error'|'info'
export function Toast({variant='info',title='Уведомление',description='Операция выполнена'}:{variant?:ToastVariant;title?:string;description?:string}){return <aside className={`${styles.root} ${styles[variant]}`}><i className={styles.dot}/><div><strong>{title}</strong><span>{description}</span></div><button aria-label="Закрыть"/></aside>}
