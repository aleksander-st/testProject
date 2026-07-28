import styles from '../ServerCreate.module.css'

interface SectionHeadingProps {
  id: string
  title: string
  description: string
}

export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <div className={styles.sectionHeading}>
      <h2 className="ds-body-base" id={id}>{title}</h2>
      <p className="ds-body-xs">{description}</p>
    </div>
  )
}
