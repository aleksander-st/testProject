import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Badge,
  Button,
  Dropdown,
  Input,
  OptionCard,
  Select,
  Toast,
  type ToastVariant,
} from '../components'
import styles from './Sandboxes.module.css'

type FormStatus = 'idle' | 'error' | 'loading' | 'success'
type ToastState = { variant: ToastVariant; title: string; description: string }

const locations = ['Amsterdam', 'Frankfurt', 'Warsaw']
const images = [
  { title: 'Ubuntu 24.04', description: 'Рекомендуемый образ' },
  { title: 'Debian 12', description: 'Стабильная версия' },
]
const quickActions = [
  { id: 'fill', label: 'Заполнить пример' },
  { id: 'clear', label: 'Очистить форму', destructive: true },
  { id: 'reset', label: 'Сбросить статус' },
]

function FormSandbox() {
  const [serverName, setServerName] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState(images[0].title)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [toast, setToast] = useState<ToastState | null>(null)

  const invalidName = status === 'error' && serverName.trim().length < 3
  const invalidLocation = status === 'error' && !location

  useEffect(() => {
    if (status !== 'loading') return
    const timer = window.setTimeout(() => {
      setStatus('success')
      setToast({
        variant: 'success',
        title: 'Сервер создаётся',
        description: `${serverName} · ${location} · ${image}`,
      })
    }, 900)
    return () => window.clearTimeout(timer)
  }, [image, location, serverName, status])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (serverName.trim().length < 3 || !location) {
      setStatus('error')
      setToast({
        variant: 'error',
        title: 'Проверьте форму',
        description: 'Заполните имя сервера и выберите локацию.',
      })
      return
    }
    setStatus('loading')
    setToast({
      variant: 'info',
      title: 'Проверяем конфигурацию',
      description: 'Подготавливаем сервер к созданию.',
    })
  }

  const reset = () => {
    setServerName('')
    setLocation('')
    setImage(images[0].title)
    setStatus('idle')
    setToast({
      variant: 'info',
      title: 'Форма очищена',
      description: 'Можно начать сценарий заново.',
    })
  }

  const handleQuickAction = (action: string) => {
    if (action === 'fill') {
      setServerName('vpn-ams-01')
      setLocation('Amsterdam')
      setImage(images[0].title)
      setStatus('idle')
      setToast({
        variant: 'info',
        title: 'Пример заполнен',
        description: 'Теперь отправьте форму.',
      })
    }
    if (action === 'clear') reset()
    if (action === 'reset') {
      setStatus('idle')
      setToast(null)
    }
  }

  return (
    <form className={styles.shell} aria-busy={status === 'loading'} onSubmit={submit}>
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <h2 className="ds-heading-xl">Создание сервера</h2>
          <p>Заполните форму, проверьте валидацию и дождитесь результата.</p>
        </div>
        {status === 'success' && <Badge variant="success">Конфигурация принята</Badge>}
      </header>

      <div className={styles.formGrid}>
        <Input
          label="Имя сервера"
          value={serverName}
          placeholder="vpn-ams-01"
          state={invalidName ? 'error' : 'default'}
          errorMessage="Минимум 3 символа"
          onChange={event => {
            setServerName(event.target.value)
            if (status === 'error') setStatus('idle')
          }}
        />
        <Select
          label="Выберите локацию"
          value={location || 'Выберите локацию'}
          options={locations}
          state={invalidLocation ? 'error' : 'default'}
          errorMessage="Выберите локацию"
          onChange={value => {
            setLocation(value)
            if (status === 'error') setStatus('idle')
          }}
        />
      </div>

      <div className={styles.fieldGroup}>
        <h3 className="ds-heading-lg">Образ системы</h3>
        <div className={styles.optionGrid}>
          {images.map(option => (
            <OptionCard
              title={option.title}
              description={option.description}
              state={image === option.title ? 'selected' : 'default'}
              onClick={() => setImage(option.title)}
              key={option.title}
            />
          ))}
        </div>
      </div>

      <div className={styles.statusLine} aria-live="polite">
        <span className={styles.statusText}>
          {status === 'idle' && 'Форма готова к заполнению.'}
          {status === 'error' && 'Есть ошибки — исправьте отмеченные поля.'}
          {status === 'loading' && 'Создаём сервер…'}
          {status === 'success' && 'Сценарий успешно завершён.'}
        </span>
      </div>

      <div className={styles.actions}>
        <Dropdown items={quickActions} onAction={handleQuickAction} />
        <Button type="secondary" onClick={reset}>Отмена</Button>
        <Button htmlType="submit" state={status === 'loading' ? 'loading' : 'default'}>
          Создать сервер
        </Button>
      </div>

      <div className={styles.toastDock}>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    </form>
  )
}

/** Интерактивная форма: выбор значений, валидация, submit/loading/success, cancel и быстрые действия. */
const meta = {
  title: 'Sandboxes/Форма',
  component: FormSandbox,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FormSandbox>

export default meta
type Story = StoryObj<typeof meta>

/** Полный сценарий создания сервера — попробуйте пустой submit и успешное заполнение. */
export const ServerCreate: Story = {}
