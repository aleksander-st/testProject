import styles from './Toast.module.css'

export type ToastVariant = 'success' | 'warning' | 'error' | 'info'

export interface ToastProps {
  variant?: ToastVariant
  title?: string
  description?: string
  onClose?: () => void
}

export function Toast({ variant = 'info', title = 'Уведомление', description = 'Операция выполнена', onClose }: ToastProps) {
  return (
    <aside className={`${styles.root} ${styles[variant]}`} role="status">
      <i className={styles.dot} />
      <div><strong>{title}</strong><span>{description}</span></div>
      <button type="button" aria-label="Закрыть" onClick={onClose} />
    </aside>
  )
}
