import type { LucideIcon } from 'lucide-react'
import styles from '../ServerDetails.module.css'

interface ConfigItemProps {
  icon: LucideIcon
  label: string
  value: string
}

export function ConfigItem({ icon: Icon, label, value }: ConfigItemProps) {
  return (
    <div className={styles.configItem}>
      <span className={styles.configLabel}>
        <Icon aria-hidden="true" />
        <span className="ds-label-xs">{label}</span>
      </span>
      <span className="ds-body-base">{value}</span>
    </div>
  )
}
