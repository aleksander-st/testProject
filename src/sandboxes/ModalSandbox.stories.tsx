import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Server } from 'lucide-react'
import { Badge, Button, Input, Modal, Toast } from '../components'
import styles from './Sandboxes.module.css'

const serverName = 'vpn-ams-01'

function ModalSandbox() {
  const [isOpen, setIsOpen] = useState(true)
  const [confirmation, setConfirmation] = useState('')
  const [attempted, setAttempted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<'success' | 'cancelled' | null>(null)

  const isValid = confirmation === serverName

  useEffect(() => {
    if (!submitting) return
    const timer = window.setTimeout(() => {
      setSubmitting(false)
      setIsOpen(false)
      setMessage('success')
    }, 800)
    return () => window.clearTimeout(timer)
  }, [submitting])

  const openModal = () => {
    setConfirmation('')
    setAttempted(false)
    setMessage(null)
    setIsOpen(true)
  }

  const confirm = () => {
    if (!isValid) {
      setAttempted(true)
      return
    }
    setSubmitting(true)
  }

  const cancel = () => {
    setIsOpen(false)
    setSubmitting(false)
    setMessage('cancelled')
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <h2 className="ds-heading-xl">Переустановка сервера</h2>
          <p>Откройте модалку, проверьте ошибку подтверждения и завершите действие.</p>
        </div>
        <div className={styles.toolbar}>
          <Server aria-hidden="true" />
          <Badge variant={message === 'success' ? 'success' : attempted ? 'error' : 'warning'}>
            {message === 'success' ? 'Переустановлен' : attempted ? 'Проверьте имя' : 'Требует подтверждения'}
          </Badge>
        </div>
      </header>

      <div className={styles.statusLine} aria-live="polite">
        <span className={styles.statusText}>
          {isOpen && !submitting && 'Диалог открыт — введите имя сервера для подтверждения.'}
          {submitting && 'Запускаем переустановку…'}
          {!isOpen && message === 'success' && 'Переустановка успешно запущена.'}
          {!isOpen && message === 'cancelled' && 'Действие отменено.'}
        </span>
        {!isOpen && <Button onClick={openModal}>Открыть снова</Button>}
      </div>

      {isOpen && (
        <div className={styles.modalStage}>
          <Modal
            title="Переустановить сервер?"
            cancelLabel="Отмена"
            confirmLabel="Переустановить"
            confirmState={submitting ? 'loading' : 'default'}
            onCancel={cancel}
            onConfirm={confirm}
          >
            <div className={styles.fieldGroup}>
              <p className={styles.muted}>Все данные будут удалены. Для подтверждения введите <strong>{serverName}</strong>.</p>
              <Input label="Сервер" value={serverName} readOnly />
              <Input
                label="Подтверждение"
                value={confirmation}
                placeholder={serverName}
                state={attempted && !isValid ? 'error' : 'default'}
                errorMessage="Имя сервера не совпадает"
                onChange={event => {
                  setConfirmation(event.target.value)
                  if (attempted) setAttempted(false)
                }}
              />
            </div>
          </Modal>
        </div>
      )}

      <div className={styles.toastDock}>
        {message === 'success' && (
          <Toast
            variant="success"
            title="Переустановка запущена"
            description="Сервер будет доступен через несколько минут."
            onClose={() => setMessage(null)}
          />
        )}
        {message === 'cancelled' && (
          <Toast
            variant="info"
            title="Без изменений"
            description="Переустановка отменена."
            onClose={() => setMessage(null)}
          />
        )}
      </div>
    </div>
  )
}

/** Интерактивный Modal: открытие, cancel, валидация подтверждения, loading и success. */
const meta = {
  title: 'Sandboxes/Модальное окно',
  component: ModalSandbox,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ModalSandbox>

export default meta
type Story = StoryObj<typeof meta>

/** Сценарий переустановки сервера с обязательным подтверждением имени. */
export const ReinstallServer: Story = {}
