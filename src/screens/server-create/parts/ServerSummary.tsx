import { Button } from '../../../components'
import type { OperatingSystemOption, PlanOption, RegionOptionData } from '../../../data/types'
import styles from '../ServerCreate.module.css'

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.summaryRow}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

interface ServerSummaryProps {
  os: OperatingSystemOption
  region: RegionOptionData
  plan: PlanOption
  sshKey: string
  serverName: string
  balance: number
  currentForecast: number
  isSubmitting: boolean
  submitError: string
}

export function ServerSummary({
  os,
  region,
  plan,
  sshKey,
  serverName,
  balance,
  currentForecast,
  isSubmitting,
  submitError,
}: ServerSummaryProps) {
  const insufficientBalance = balance < plan.price
  const nextForecast = Math.max(0, currentForecast - plan.forecastImpact)

  return (
    <aside className={styles.summary} aria-labelledby="server-summary-title">
      <h2 className="ds-heading-lg" id="server-summary-title">Ваш сервер</h2>

      <div className={styles.summaryItems}>
        <SummaryRow label="ОС" value={`${os.name} ${os.version}`} />
        <SummaryRow label="Регион" value={region.city} />
        <SummaryRow label="Тариф" value={plan.name} />
        <SummaryRow label="SSH-ключ" value={sshKey.replace(/\s*\(.+\)$/, '')} />
        <SummaryRow label="Имя" value={serverName || '—'} />
      </div>

      <div className={styles.divider} />

      <div className={styles.summaryPrice}>
        <div><strong>${plan.price}</strong><span>/ месяц</span></div>
        <small>≈ {plan.dailyPrice} USDT/день · {plan.price.toFixed(2)} USDT с баланса</small>
      </div>

      <div className={styles.divider} />

      <div className={styles.forecast}>
        <p className="ds-label-xs">ВЛИЯНИЕ НА ПРОГНОЗ</p>
        <span><i className={styles.successDot} />Сейчас: {currentForecast} дней</span>
        <strong><i className={styles.warningDot} />После создания: {nextForecast} дней</strong>
      </div>

      {(insufficientBalance || submitError) && (
        <div className={styles.formAlert} role="alert">
          {submitError || `Недостаточно средств: на балансе ${balance.toFixed(2)} USDT`}
        </div>
      )}

      <Button
        className={styles.createButton}
        htmlType="submit"
        state={isSubmitting ? 'loading' : insufficientBalance ? 'disabled' : 'default'}
      >
        Создать сервер
      </Button>
      <p className={`${styles.deployNote} ds-body-xs`}>Деплой обычно занимает до 60 секунд</p>
    </aside>
  )
}
