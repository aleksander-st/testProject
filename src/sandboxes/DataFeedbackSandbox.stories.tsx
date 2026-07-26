import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { WalletCards } from 'lucide-react'
import {
  Button,
  IconButton,
  Table,
  Tabs,
  Toast,
  Tooltip,
  type TableRow,
  type ToastVariant,
} from '../components'
import styles from './Sandboxes.module.css'

type ToastState = { variant: ToastVariant; title: string; description: string }

const initialRows: TableRow[] = [
  ['12 апр', '+50.00', 'Пополнение TON', 'Зачислено', '5FHn2x...kL3M'],
  ['01 апр', '−10.00', 'Списание (vpn-ams-01)', 'Готово', '—'],
  ['23 мар', '+100.00', 'Пополнение TRC-20', 'Зачислено', '8HKp3w...rT9Q'],
]

function DataFeedbackSandbox() {
  const [rows, setRows] = useState<TableRow[]>(initialRows)
  const [density, setDensity] = useState('Комфортно')
  const [selectedHash, setSelectedHash] = useState<string>()
  const [showHelp, setShowHelp] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)

  const addTopup = () => {
    const nextHash = `demo-${rows.length + 1}`
    const nextRow: TableRow = ['26 июл', '+25.00', 'Пополнение USDT', 'Зачислено', nextHash]
    setRows(current => [nextRow, ...current])
    setSelectedHash(nextHash)
    setToast({
      variant: 'success',
      title: 'Баланс пополнен',
      description: '25.00 USDT добавлены в историю операций.',
    })
  }

  const selectRow = (row: TableRow) => {
    setSelectedHash(row[4])
    setToast({
      variant: 'info',
      title: 'Операция выбрана',
      description: `${row[0]} · ${row[1]} · ${row[3]}`,
    })
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <h2 className="ds-heading-xl">История операций</h2>
          <p>Добавляйте операции, переключайте плотность и выбирайте строки таблицы.</p>
        </div>
        <WalletCards aria-hidden="true" />
      </header>

      <div className={styles.toolbar}>
        <Button onClick={addTopup}>Пополнить на 25 USDT</Button>
        <Tabs
          items={['Комфортно', 'Компактно']}
          active={density}
          onChange={setDensity}
        />
        <div
          className={styles.help}
          onMouseEnter={() => setShowHelp(true)}
          onMouseLeave={() => setShowHelp(false)}
          onFocusCapture={() => setShowHelp(true)}
          onBlurCapture={() => setShowHelp(false)}
        >
          <IconButton type="secondary" label="Как работать с таблицей" />
          {showHelp && (
            <div className={styles.helpTooltip}>
              <Tooltip placement="bottom">Кликните строку, чтобы увидеть детали</Tooltip>
            </div>
          )}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <Table
          density={density === 'Компактно' ? 'compact' : 'default'}
          rows={rows}
          selectedHash={selectedHash}
          onRowClick={selectRow}
        />
      </div>

      <div className={styles.statusLine} aria-live="polite">
        <span className={styles.statusText}>
          {selectedHash ? `Выбрана операция ${selectedHash}` : 'Выберите строку таблицы.'}
        </span>
      </div>

      <div className={styles.toastDock}>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    </div>
  )
}

/** Интерактивная связка Table, Toast и Tooltip с добавлением и выбором операций. */
const meta = {
  title: 'Sandboxes/Данные и обратная связь',
  component: DataFeedbackSandbox,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DataFeedbackSandbox>

export default meta
type Story = StoryObj<typeof meta>

/** Пополнение баланса добавляет строку и Toast; выбор строки показывает её детали. */
export const BillingHistory: Story = {}
