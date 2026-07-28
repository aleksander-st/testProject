import {
  ArrowUpRight,
  CalendarDays,
  Copy,
  Cpu,
  HardDrive,
  LogIn,
  MapPin,
  Power,
  RefreshCw,
  RotateCw,
  Server,
  Terminal,
} from 'lucide-react'
import { useState } from 'react'
import { Badge, Breadcrumb, Button, LinkItem, Tabs } from '../../components'
import { usePrototypeStore } from '../../data/PrototypeStoreContext'
import type { ServerEvent, ServerStatus } from '../../data/types'
import { navigate } from '../../navigation'
import { ProductHeader } from '../shared/ProductHeader'
import cpuFill from './assets/cpu-fill.svg'
import cpuLine from './assets/cpu-line.svg'
import diskFill from './assets/disk-fill.svg'
import diskLine from './assets/disk-line.svg'
import networkFill from './assets/network-fill.svg'
import networkLine from './assets/network-line.svg'
import ramFill from './assets/ram-fill.svg'
import ramLine from './assets/ram-line.svg'
import { ConfigItem } from './parts/ConfigItem'
import { EventRow } from './parts/EventRow'
import { LoadMetric } from './parts/LoadMetric'
import { MetricChart } from './parts/MetricChart'
import styles from './ServerDetails.module.css'

function getServerStatus(status: ServerStatus) {
  switch (status) {
    case 'running':
      return { label: 'Работает', variant: 'success' as const }
    case 'deploying':
      return { label: 'Деплой', variant: 'warning' as const }
    case 'rebooting':
      return { label: 'Перезагрузка', variant: 'warning' as const }
    case 'stopped':
      return { label: 'Остановлен', variant: 'neutral' as const }
  }
}

function getEventIcon(kind: ServerEvent['kind']) {
  switch (kind) {
    case 'update':
      return RefreshCw
    case 'login':
      return LogIn
    case 'traffic':
      return ArrowUpRight
    case 'power':
      return Power
    case 'create':
      return Server
  }
}

export function ServerDetails() {
  const {
    servers,
    restartServer,
    toggleServer,
    showToast,
  } = usePrototypeStore()
  const serverId = decodeURIComponent(
    window.location.pathname.split('/').filter(Boolean).at(-1) ?? 'vpn-ams-01',
  )
  const server = servers.find(item => item.id === serverId)
  const [activeTab, setActiveTab] = useState('Обзор')
  const [activePeriod, setActivePeriod] = useState('24ч')
  const [pendingAction, setPendingAction] = useState<'restart' | 'power' | null>(null)

  if (!server) {
    return (
      <main className={styles.page}>
        <ProductHeader />
        <section className={styles.notFound}>
          <Server aria-hidden="true" />
          <h1 className="ds-heading-2xl">Сервер не найден</h1>
          <p className="ds-body-sm">В мок-слое нет сервера с идентификатором «{serverId}».</p>
          <Button onClick={() => navigate('/dashboard')}>Вернуться к серверам</Button>
        </section>
      </main>
    )
  }

  const status = getServerStatus(server.status)

  const handleRestart = async () => {
    setPendingAction('restart')
    await restartServer(server.id)
    setPendingAction(null)
  }

  const handlePower = async () => {
    setPendingAction('power')
    await toggleServer(server.id)
    setPendingAction(null)
  }

  const actionBlocked = server.status === 'deploying'

  return (
    <main className={styles.page}>
      <ProductHeader />

      <section className={styles.pageHeader}>
        <div className={styles.pageHeading}>
          <Breadcrumb items={['Серверы', server.name]} />
          <div className={styles.titleRow}>
            <h1 className="ds-heading-3xl">{server.name}</h1>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <div className={styles.metadata}>
            <span className={styles.ipAddress}>
              <strong>{server.address}</strong>
              <Copy aria-hidden="true" />
            </span>
            <span className={styles.separator}>·</span>
            <span>{server.uptime}</span>
            <span className={styles.separator}>·</span>
            <span className={styles.region}>
              <MapPin aria-hidden="true" />
              {server.region}
            </span>
          </div>
        </div>

        <div className={styles.pageActions}>
          <Button
            type="secondary"
            onClick={() => showToast('info', 'Web-консоль', `Сессия для ${server.name} открыта в демо-режиме`)}
          >
            <Terminal aria-hidden="true" />Консоль
          </Button>
          <Button
            type="secondary"
            state={
              pendingAction === 'restart'
                ? 'loading'
                : actionBlocked || server.status === 'rebooting'
                  ? 'disabled'
                  : 'default'
            }
            onClick={handleRestart}
          >
            <RotateCw aria-hidden="true" />Перезагрузить
          </Button>
          <Button
            type="secondary"
            state={
              pendingAction === 'power'
                ? 'loading'
                : actionBlocked || server.status === 'rebooting'
                  ? 'disabled'
                  : 'default'
            }
            onClick={handlePower}
          >
            <Power aria-hidden="true" />
            {server.status === 'stopped' ? 'Запустить' : 'Остановить'}
          </Button>
        </div>
      </section>

      <div className={styles.tabsBand}>
        <div className={styles.tabsInner}>
          <Tabs
            items={['Обзор', 'Сеть', 'Управление', 'Снапшоты', 'Логи']}
            active={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </div>

      {activeTab === 'Обзор' ? (
        <div className={styles.content}>
        <section className={styles.topRow} aria-label="Конфигурация сервера">
          <div className={styles.configBlock}>
            <ConfigItem icon={HardDrive} label="ОПЕРАЦИОННАЯ СИСТЕМА" value={server.osLabel} />
            <ConfigItem icon={MapPin} label="РЕГИОН" value={server.region} />
            <ConfigItem
              icon={Cpu}
              label="ТАРИФ"
              value={`${server.planName} · ${server.cpu} / ${server.ram} / ${server.ssd} SSD`}
            />
            <ConfigItem icon={CalendarDays} label="СОЗДАН" value={server.createdAt} />
          </div>

          <div className={styles.statusPanel}>
            <p className="ds-label-xs">ТЕКУЩАЯ НАГРУЗКА</p>
            <div className={styles.loadGrid}>
              <LoadMetric kind="cpu" label="CPU" value="34%" />
              <LoadMetric kind="ram" label="RAM" value="62%" />
              <LoadMetric kind="disk" label="Диск" value="18%" />
              <LoadMetric kind="network" label="Сеть" value="12%" />
            </div>
          </div>
        </section>

        <div className={styles.sectionHeading}>
          <h2 className="ds-heading-xl">Метрики за 24 часа</h2>
          <div className={styles.periods} aria-label="Период метрик">
            {['1ч', '24ч', '7д', '30д'].map(period => (
              <button
                type="button"
                className={activePeriod === period ? styles.activePeriod : ''}
                aria-pressed={activePeriod === period}
                onClick={() => setActivePeriod(period)}
                key={period}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <section className={styles.charts} aria-label="Метрики сервера">
          <MetricChart
            kind="cpuChart"
            title="CPU"
            value="34%"
            trend="↓ −2%"
            trendTone="success"
            fillSrc={cpuFill}
            lineSrc={cpuLine}
          />
          <MetricChart
            kind="ramChart"
            title="RAM"
            value="62%"
            trend="↑ +5%"
            trendTone="warning"
            fillSrc={ramFill}
            lineSrc={ramLine}
          />
          <MetricChart
            kind="diskChart"
            title="Диск"
            value="18%"
            trend="→ 0%"
            fillSrc={diskFill}
            lineSrc={diskLine}
          />
          <MetricChart
            kind="networkChart"
            title="Сеть"
            value="12 Мбит/с"
            trend="↑ peak 47"
            trendTone="action"
            fillSrc={networkFill}
            lineSrc={networkLine}
          />
        </section>

        <section className={styles.events}>
          <div className={styles.sectionHeading}>
            <h2 className="ds-heading-xl">События сервера</h2>
            <LinkItem
              href={`/servers/${server.id}`}
              onClick={event => {
                event.preventDefault()
                showToast('info', 'Все события загружены', `Показано: ${server.events.length}`)
              }}
            >
              Все события
            </LinkItem>
          </div>

          {server.events.length > 0 ? (
            <div className={styles.eventsCard}>
              {server.events.map(event => (
                <EventRow
                  key={event.id}
                  icon={getEventIcon(event.kind)}
                  time={event.time}
                  title={event.title}
                  description={event.description}
                  tone={event.tone === 'default' ? undefined : event.tone}
                />
              ))}
            </div>
          ) : (
            <div className={styles.eventsEmpty}>
              <RefreshCw aria-hidden="true" />
              <p className="ds-body-sm">Событий для этого сервера пока нет.</p>
            </div>
          )}
        </section>
        </div>
      ) : (
        <section className={styles.tabEmpty}>
          <h2 className="ds-heading-xl">{activeTab}</h2>
          <p className="ds-body-sm">
            В мок-прототипе для этого раздела пока нет данных. Состояние вкладки и навигация работают.
          </p>
          <Button type="secondary" onClick={() => setActiveTab('Обзор')}>Вернуться к обзору</Button>
        </section>
      )}
    </main>
  )
}
