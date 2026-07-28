import type { LucideIcon } from 'lucide-react'
import styles from '../Dashboard.module.css'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  detail: string
  detailTone?: 'default' | 'success'
  detailIcon?: LucideIcon
  iconTone?: 'action' | 'warning'
}

export function StatCard({
  icon: Icon,
  label,
  value,
  detail,
  detailTone = 'default',
  detailIcon: DetailIcon,
  iconTone = 'action',
}: StatCardProps) {
  return (
    <article className={styles.statCard}>
      <div className={styles.statLabel}>
        <span className={`${styles.statIcon} ${iconTone === 'warning' ? styles.iconWarning : ''}`}>
          <Icon aria-hidden="true" />
        </span>
        <span className="ds-label-xs">{label}</span>
      </div>
      <strong className="ds-heading-2xl">{value}</strong>
      <span className={`${styles.statDetail} ${detailTone === 'success' ? styles.success : ''}`}>
        {DetailIcon && <DetailIcon aria-hidden="true" />}
        {detail}
      </span>
    </article>
  )
}
