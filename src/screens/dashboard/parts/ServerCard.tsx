import { Clock3, Copy, Cpu, HardDrive, MapPin, MoreVertical, Server } from 'lucide-react'
import { Badge, LinkItem, type BadgeVariant } from '../../../components'
import { handleInternalLink } from '../../../navigation'
import styles from '../Dashboard.module.css'

interface ServerCardProps {
  name: string
  address: string
  status: string
  statusVariant: BadgeVariant
  os: string
  location: string
  resources: string
  uptime: string
  href: string
}

export function ServerCard({
  name,
  address,
  status,
  statusVariant,
  os,
  location,
  resources,
  uptime,
  href,
}: ServerCardProps) {
  return (
    <article className={styles.serverCard}>
      <div className={styles.serverTop}>
        <span className={styles.serverIcon}>
          <Server aria-hidden="true" />
        </span>
        <h3 className="ds-heading-lg">{name}</h3>
        <span className={styles.serverSpacer} />
        <Badge variant={statusVariant}>{status}</Badge>
        <span className={styles.moreIcon} aria-hidden="true">
          <MoreVertical />
        </span>
      </div>

      <div className={styles.addressRow}>
        <span className="ds-body-sm-medium">{address}</span>
        <Copy aria-hidden="true" />
      </div>

      <div className={styles.chips}>
        <span className={styles.chip}>
          <HardDrive aria-hidden="true" />
          {os}
        </span>
        <span className={styles.chip}>
          <MapPin aria-hidden="true" />
          {location}
        </span>
        <span className={styles.chip}>
          <Cpu aria-hidden="true" />
          {resources}
        </span>
      </div>

      <div className={styles.serverFooter}>
        <span className={styles.uptime}>
          <Clock3 aria-hidden="true" />
          {uptime}
        </span>
        <LinkItem href={href} onClick={event => handleInternalLink(event, href)}>
          Детали
        </LinkItem>
      </div>
    </article>
  )
}
