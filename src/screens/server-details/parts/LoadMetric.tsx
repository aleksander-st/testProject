import styles from '../ServerDetails.module.css'

interface LoadMetricProps {
  kind: 'cpu' | 'ram' | 'disk' | 'network'
  label: string
  value: string
}

export function LoadMetric({ kind, label, value }: LoadMetricProps) {
  return (
    <div className={`${styles.loadMetric} ${styles[kind]}`}>
      <div className={styles.loadHeading}>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <span className={styles.progressTrack}>
        <span className={styles.progressValue} />
      </span>
    </div>
  )
}
