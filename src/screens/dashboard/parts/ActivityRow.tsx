import type { LucideIcon } from 'lucide-react'
import styles from '../Dashboard.module.css'

interface ActivityRowProps {
  icon: LucideIcon
  time: string
  title: string
  description: string
  amount: string
  tone?: 'default' | 'success' | 'error' | 'action'
}

export function ActivityRow({
  icon: Icon,
  time,
  title,
  description,
  amount,
  tone = 'default',
}: ActivityRowProps) {
  const toneClass = tone === 'default' ? '' : styles[tone]

  return (
    <div className={styles.activityRow}>
      <span className={`${styles.activityIcon} ${toneClass}`}>
        <Icon aria-hidden="true" />
      </span>
      <span className={styles.activityTime}>{time}</span>
      <span className={styles.activityCopy}>
        <strong className="ds-body-sm-medium">{title}</strong>
        <span className="ds-body-xs">{description}</span>
      </span>
      <strong className={`${styles.activityAmount} ${toneClass}`}>{amount}</strong>
    </div>
  )
}
