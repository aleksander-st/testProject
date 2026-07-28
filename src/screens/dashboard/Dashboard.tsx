import {
  Activity,
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Clock3,
  Plus,
  RefreshCw,
  Server,
  WalletCards,
} from 'lucide-react'
import { useState } from 'react'
import { Button, LinkItem } from '../../components'
import { usePrototypeStore } from '../../data/PrototypeStoreContext'
import type { ServerStatus } from '../../data/types'
import { navigate } from '../../navigation'
import { ProductHeader } from '../shared/ProductHeader'
import { ActivityRow } from './parts/ActivityRow'
import { ServerCard } from './parts/ServerCard'
import { StatCard } from './parts/StatCard'
import styles from './Dashboard.module.css'

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

export function Dashboard() {
  const {
    balance,
    forecastDays,
    servers,
    operations,
    restartAll,
    addDemoBalance,
    showToast,
  } = usePrototypeStore()
  const [isRestarting, setIsRestarting] = useState(false)
  const activeServers = servers.filter(server => server.status === 'running').length
  const lowBalance = balance < 20 || forecastDays < 7

  const handleRestartAll = async () => {
    setIsRestarting(true)
    await restartAll()
    setIsRestarting(false)
  }

  return (
    <main className={styles.page}>
      <ProductHeader />

      <div className={styles.body}>
        <section className={styles.stats} aria-label="Сводка">
          <StatCard
            icon={WalletCards}
            label="БАЛАНС"
            value={`${balance.toFixed(2)} USDT`}
            detail={`≈ $${balance.toFixed(2)}`}
          />
          <StatCard
            icon={Server}
            label="АКТИВНЫХ СЕРВЕРОВ"
            value={String(activeServers)}
            detail="+1 за месяц"
            detailTone="success"
            detailIcon={ArrowUp}
          />
          <StatCard
            icon={Clock3}
            label="ПРОГНОЗ ОКОНЧАНИЯ"
            value={`${forecastDays} дней`}
            detail="при текущей нагрузке"
            iconTone="warning"
          />
        </section>

        {lowBalance && (
          <aside className={styles.balanceWarning}>
            <strong>Баланс заканчивается</strong>
            <span>Пополните баланс, чтобы создание и работа серверов не остановились.</span>
          </aside>
        )}

        <section className={styles.quickActions} aria-label="Быстрые действия">
          <Button onClick={() => navigate('/servers/create')}>
            <Plus aria-hidden="true" />Создать сервер
          </Button>
          <Button type="secondary" onClick={addDemoBalance}>
            <ArrowUpRight aria-hidden="true" />Пополнить баланс
          </Button>
          <Button
            type="secondary"
            state={isRestarting ? 'loading' : 'default'}
            onClick={handleRestartAll}
          >
            <RefreshCw aria-hidden="true" />Перезагрузить все
          </Button>
          <Button
            type="secondary"
            onClick={() => showToast('info', 'Все системы работают', 'Инцидентов в мок-сервисе нет')}
          >
            <Activity aria-hidden="true" />Статус сервиса
          </Button>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div className={styles.titleRow}>
              <h2 className="ds-heading-2xl">Мои серверы</h2>
              <span className={styles.count}>{servers.length}</span>
            </div>
            <LinkItem href="#servers">Все серверы</LinkItem>
          </div>

          {servers.length > 0 ? (
            <div className={styles.servers} id="servers">
              {servers.map(server => {
                const status = getServerStatus(server.status)
                return (
                  <ServerCard
                    key={server.id}
                    name={server.name}
                    address={server.address}
                    status={status.label}
                    statusVariant={status.variant}
                    os={server.osLabel}
                    location={server.region}
                    resources={`${server.cpu} · ${server.ram} · ${server.ssd} SSD`}
                    uptime={server.uptime}
                    href={`/servers/${server.id}`}
                  />
                )
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Server aria-hidden="true" />
              <h3 className="ds-heading-lg">Серверов пока нет</h3>
              <p className="ds-body-sm">Создайте первый сервер, и он появится здесь.</p>
              <Button onClick={() => navigate('/servers/create')}>Создать сервер</Button>
            </div>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <h2 className="ds-heading-2xl">Последние операции</h2>
            <LinkItem
              href="/dashboard"
              onClick={event => {
                event.preventDefault()
                showToast('info', 'История платежей', 'Отдельный экран ещё не собран')
              }}
            >
              История платежей
            </LinkItem>
          </div>

          <div className={styles.activityCard}>
            {operations.slice(0, 6).map(operation => (
              <ActivityRow
                key={operation.id}
                icon={
                  operation.kind === 'deposit'
                    ? ArrowUp
                    : operation.kind === 'charge'
                      ? ArrowDown
                      : Server
                }
                time={operation.time}
                title={operation.title}
                description={operation.description}
                amount={operation.amount}
                tone={operation.tone}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
