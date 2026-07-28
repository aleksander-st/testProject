import styles from '../ServerCreate.module.css'

interface PlanCardProps {
  name: string
  cpu: string
  ram: string
  ssd: string
  traffic: string
  price: string
  dailyPrice: string
  selected?: boolean
  popular?: boolean
  onClick?: () => void
  disabled?: boolean
}

export function PlanCard({
  name,
  cpu,
  ram,
  ssd,
  traffic,
  price,
  dailyPrice,
  selected = false,
  popular = false,
  onClick,
  disabled = false,
}: PlanCardProps) {
  return (
    <button
      type="button"
      className={`${styles.planCard} ${selected ? styles.selectedPlan : ''}`}
      aria-pressed={selected}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles.planHeader}>
        <h3 className="ds-heading-lg">{name}</h3>
        {popular && <span className={styles.popular}>Популярный</span>}
      </div>

      <div className={styles.planSpecs}>
        <div><span>CPU</span><strong>{cpu}</strong></div>
        <div><span>RAM</span><strong>{ram}</strong></div>
        <div><span>SSD</span><strong>{ssd}</strong></div>
        <div><span>Трафик</span><strong>{traffic}</strong></div>
      </div>

      <div className={styles.divider} />

      <div className={styles.planPrice}>
        <div><strong>{price}</strong><span>/ мес</span></div>
        <small>≈ {dailyPrice} USDT/день</small>
      </div>
    </button>
  )
}
