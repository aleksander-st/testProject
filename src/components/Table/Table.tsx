import styles from './Table.module.css'

export type TableRow = [date: string, amount: string, type: string, status: string, hash: string]

export interface TableProps {
  density?: 'compact' | 'default'
  rows?: TableRow[]
  selectedHash?: string
  onRowClick?: (row: TableRow) => void
}

const defaultRows: TableRow[] = [
  ['12 апр', '+50.00', 'Пополнение TON', 'Зачислено', '5FHn2x...kL3M'],
  ['01 апр', '−10.00', 'Списание (vpn-ams-01)', 'Готово', '—'],
  ['23 мар', '+100.00', 'Пополнение TRC-20', 'Зачислено', '8HKp3w...rT9Q'],
]

export function Table({ density = 'default', rows = defaultRows, selectedHash, onRowClick }: TableProps) {
  const activateRow = (row: TableRow) => onRowClick?.(row)

  return (
    <div className={`${styles.root} ${styles[density]}`}>
      <table>
        <thead><tr>{['Дата','Сумма','Тип','Статус','Хеш'].map(heading=><th key={heading}>{heading}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              className={`${onRowClick ? styles.selectable : ''} ${row[4] === selectedHash ? styles.selected : ''}`}
              tabIndex={onRowClick ? 0 : undefined}
              onClick={() => activateRow(row)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') activateRow(row)
              }}
              key={`${row[4]}-${rowIndex}`}
            >
              {row.map((cell,index)=><td key={index}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
