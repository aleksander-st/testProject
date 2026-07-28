import styles from '../ServerDetails.module.css'

interface MetricChartProps {
  kind: 'cpuChart' | 'ramChart' | 'diskChart' | 'networkChart'
  title: string
  value: string
  trend: string
  trendTone?: 'success' | 'warning' | 'muted' | 'action'
  fillSrc: string
  lineSrc: string
}

export function MetricChart({
  kind,
  title,
  value,
  trend,
  trendTone = 'muted',
  fillSrc,
  lineSrc,
}: MetricChartProps) {
  return (
    <article className={`${styles.chartCard} ${styles[kind]}`}>
      <div className={styles.chartHeading}>
        <span className="ds-body-sm-medium">{title}</span>
        <span className={styles.chartValue}>
          <strong className="ds-heading-xl">{value}</strong>
          <span className={styles[trendTone]}>{trend}</span>
        </span>
      </div>

      <div className={styles.chartFrame}>
        <img className={styles.chartFill} src={fillSrc} alt="" />
        <img className={styles.chartLine} src={lineSrc} alt="" />
      </div>

      <span className={styles.chartTimes}>00:00    06:00    12:00    18:00    24:00</span>
    </article>
  )
}
