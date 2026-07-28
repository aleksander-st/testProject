import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { initialOperations, initialServers, operatingSystems, plans, regions } from './mockData'
import { PrototypeStoreContext, type PrototypeStoreValue } from './PrototypeStoreContext'
import type {
  ActionResult,
  CreateServerInput,
  PrototypeToastMessage,
  ServerRecord,
  ServerStatus,
  ToastVariant,
} from './types'

const wait = (duration: number) => new Promise(resolve => window.setTimeout(resolve, duration))

export function PrototypeStoreProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(142.5)
  const [forecastDays, setForecastDays] = useState(18)
  const [servers, setServers] = useState(initialServers)
  const [operations, setOperations] = useState(initialOperations)
  const [toast, setToast] = useState<PrototypeToastMessage | null>(null)

  const showToast = useCallback((variant: ToastVariant, title: string, description: string) => {
    setToast({ id: Date.now(), variant, title, description })
  }, [])

  const clearToast = useCallback(() => setToast(null), [])

  const createServer = useCallback(async (input: CreateServerInput): Promise<ActionResult> => {
    await wait(650)

    const name = input.name.trim()
    if (servers.some(server => server.name.toLowerCase() === name.toLowerCase())) {
      const message = 'Сервер с таким именем уже существует'
      showToast('error', 'Не удалось создать сервер', message)
      return { ok: false, message }
    }

    const os = operatingSystems.find(item => item.id === input.osId)
    const region = regions.find(item => item.id === input.regionId)
    const plan = plans.find(item => item.id === input.planId)

    if (!os || !region || !plan) {
      const message = 'Не удалось найти выбранную конфигурацию'
      showToast('error', 'Ошибка конфигурации', message)
      return { ok: false, message }
    }

    if (balance < plan.price) {
      const message = `Нужно ${plan.price.toFixed(2)} USDT, на балансе ${balance.toFixed(2)} USDT`
      showToast('warning', 'Недостаточно средств', message)
      return { ok: false, message }
    }

    const serverId = name.toLowerCase()
    const createdServer: ServerRecord = {
      id: serverId,
      name,
      address: `10.24.${servers.length + 18}.${servers.length + 41}`,
      status: 'deploying',
      osId: os.id,
      osLabel: `${os.name} ${os.version}`,
      regionId: region.id,
      region: region.city,
      planId: plan.id,
      planName: plan.name,
      cpu: plan.cpu,
      ram: plan.ram,
      ssd: plan.ssd,
      traffic: plan.traffic,
      sshKey: input.sshKey.replace(/\s*\(.+\)$/, ''),
      uptime: '— · создан только что',
      createdAt: 'Сегодня',
      events: [
        {
          id: `${serverId}-created`,
          kind: 'create',
          time: 'Только что',
          title: 'Создание сервера запущено',
          description: `${os.name} ${os.version} · ${plan.name} · ${region.city}`,
          tone: 'action',
        },
      ],
    }

    setServers(current => [createdServer, ...current])
    setBalance(current => Number((current - plan.price).toFixed(2)))
    setForecastDays(current => Math.max(0, current - plan.forecastImpact))
    setOperations(current => [
      {
        id: `operation-${Date.now()}`,
        kind: 'server',
        time: 'Только что',
        title: `Создан сервер ${name}`,
        description: `${os.name} ${os.version} · ${plan.cpu} / ${plan.ram} · ${region.city}`,
        amount: `−${plan.price.toFixed(2)} USDT`,
        tone: 'action',
      },
      ...current,
    ])
    showToast('success', 'Сервер создаётся', `${name} добавлен на дашборд со статусом «Деплой»`)
    return { ok: true, serverId }
  }, [balance, servers, showToast])

  const setServerStatus = useCallback((serverId: string, status: ServerStatus) => {
    setServers(current => current.map(server => (
      server.id === serverId ? { ...server, status } : server
    )))
  }, [])

  const restartServer = useCallback(async (serverId: string): Promise<ActionResult> => {
    const server = servers.find(item => item.id === serverId)
    if (!server) return { ok: false, message: 'Сервер не найден' }
    if (server.status === 'deploying') {
      const message = 'Дождитесь завершения деплоя'
      showToast('warning', 'Перезагрузка недоступна', message)
      return { ok: false, message }
    }

    setServerStatus(serverId, 'rebooting')
    await wait(700)
    setServers(current => current.map(item => (
      item.id === serverId
        ? {
            ...item,
            status: 'running',
            events: [
              {
                id: `${serverId}-reboot-${Date.now()}`,
                kind: 'power',
                time: 'Только что',
                title: 'Сервер перезагружен',
                description: 'Мок-операция завершилась успешно',
                tone: 'success',
              },
              ...item.events,
            ],
          }
        : item
    )))
    showToast('success', 'Перезагрузка завершена', `${server.name} снова работает`)
    return { ok: true }
  }, [servers, setServerStatus, showToast])

  const toggleServer = useCallback(async (serverId: string): Promise<ActionResult> => {
    const server = servers.find(item => item.id === serverId)
    if (!server) return { ok: false, message: 'Сервер не найден' }
    if (server.status === 'deploying' || server.status === 'rebooting') {
      const message = 'Действие недоступно, пока сервер занят'
      showToast('warning', 'Подождите', message)
      return { ok: false, message }
    }

    await wait(450)
    const nextStatus: ServerStatus = server.status === 'stopped' ? 'running' : 'stopped'
    setServers(current => current.map(item => (
      item.id === serverId
        ? {
            ...item,
            status: nextStatus,
            events: [
              {
                id: `${serverId}-power-${Date.now()}`,
                kind: 'power',
                time: 'Только что',
                title: nextStatus === 'stopped' ? 'Сервер остановлен' : 'Сервер запущен',
                description: 'Состояние изменено в мок-слое',
                tone: nextStatus === 'running' ? 'success' : 'warning',
              },
              ...item.events,
            ],
          }
        : item
    )))
    showToast(
      nextStatus === 'running' ? 'success' : 'warning',
      nextStatus === 'running' ? 'Сервер запущен' : 'Сервер остановлен',
      server.name,
    )
    return { ok: true }
  }, [servers, showToast])

  const restartAll = useCallback(async (): Promise<ActionResult> => {
    const restartable = servers.filter(server => server.status === 'running')
    if (restartable.length === 0) {
      const message = 'Нет работающих серверов для перезагрузки'
      showToast('info', 'Нечего перезагружать', message)
      return { ok: false, message }
    }

    const ids = new Set(restartable.map(server => server.id))
    setServers(current => current.map(server => (
      ids.has(server.id) ? { ...server, status: 'rebooting' } : server
    )))
    await wait(800)
    setServers(current => current.map(server => (
      ids.has(server.id) ? { ...server, status: 'running' } : server
    )))
    showToast('success', 'Серверы перезагружены', `Готово: ${restartable.length}`)
    return { ok: true }
  }, [servers, showToast])

  const addDemoBalance = useCallback(() => {
    setBalance(current => Number((current + 50).toFixed(2)))
    setForecastDays(current => current + 6)
    setOperations(current => [
      {
        id: `operation-${Date.now()}`,
        kind: 'deposit',
        time: 'Только что',
        title: 'Демо-пополнение баланса',
        description: 'Мок-операция · без блокчейна',
        amount: '+50.00 USDT',
        tone: 'success',
      },
      ...current,
    ])
    showToast('success', 'Баланс пополнен', 'Добавлено 50.00 USDT в мок-слое')
  }, [showToast])

  const value = useMemo<PrototypeStoreValue>(() => ({
    balance,
    forecastDays,
    servers,
    operations,
    toast,
    createServer,
    restartServer,
    toggleServer,
    restartAll,
    addDemoBalance,
    showToast,
    clearToast,
  }), [
    addDemoBalance,
    balance,
    clearToast,
    createServer,
    forecastDays,
    operations,
    restartAll,
    restartServer,
    servers,
    showToast,
    toast,
    toggleServer,
  ])

  return (
    <PrototypeStoreContext.Provider value={value}>
      {children}
    </PrototypeStoreContext.Provider>
  )
}
