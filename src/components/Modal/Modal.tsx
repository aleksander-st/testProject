import type { ReactNode } from 'react'
import { Button, type ButtonState } from '../Button'
import styles from './Modal.module.css'

export interface ModalProps {
  title: string
  children: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  confirmState?: ButtonState
  confirmDisabled?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

export function Modal({
  title,
  children,
  cancelLabel = 'Отмена',
  confirmLabel = 'Продолжить',
  confirmState = 'default',
  confirmDisabled,
  onCancel,
  onConfirm,
}: ModalProps) {
  return (
    <section className={styles.root} role="dialog" aria-modal="true" aria-label={title}>
      <h3 className="ds-heading-xl">{title}</h3>
      <div className="ds-body-sm">{children}</div>
      <footer>
        <Button type="secondary" onClick={onCancel}>{cancelLabel}</Button>
        <Button state={confirmState} disabled={confirmDisabled} onClick={onConfirm}>{confirmLabel}</Button>
      </footer>
    </section>
  )
}
