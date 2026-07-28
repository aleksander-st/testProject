import type { LucideIcon } from 'lucide-react'
import styles from '../ServerDetails.module.css'

interface EventRowProps {
  icon: LucideIcon
  time: string
  title: string
  description: string
  tone?: 'action' | 'success' | 'warning' | 'muted'
}

export function EventRow({
  icon: Icon,
  time,
  title,
  description,
  tone = 'muted',
}: EventRowProps) {
  return (
    <div className={styles.eventRow}>
      <span className={`${styles.eventIcon} ${styles[tone]}`}>
        <Icon aria-hidden="true" />
      </span>
      <span className={styles.eventTime}>{time}</span>
      <span className={styles.eventCopy}>
        <strong className="ds-body-sm-medium">{title}</strong>
        <span className="ds-body-xs">{description}</span>
      </span>
    </div>
  )
}
