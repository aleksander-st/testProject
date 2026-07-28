import styles from '../ServerCreate.module.css'

interface RegionOptionProps {
  flag: string
  city: string
  ping: string
  selected?: boolean
  onClick?: () => void
  disabled?: boolean
}

export function RegionOption({
  flag,
  city,
  ping,
  selected = false,
  onClick,
  disabled = false,
}: RegionOptionProps) {
  return (
    <button
      type="button"
      className={`${styles.regionOption} ${selected ? styles.selectedRegion : ''}`}
      aria-pressed={selected}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.flag} aria-hidden="true">{flag}</span>
      <span className={styles.regionCopy}>
        <strong className="ds-body-sm-medium">{city}</strong>
        <small className="ds-body-xs">{ping}</small>
      </span>
    </button>
  )
}
