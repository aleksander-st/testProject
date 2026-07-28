import type { ComponentType } from 'react'
import { Dashboard } from './dashboard/Dashboard'
import { ServerCreate } from './server-create/ServerCreate'
import { ServerDetails } from './server-details/ServerDetails'

export interface ScreenRegistryItem {
  id: string
  name: string
  description: string
  route: string
  component: ComponentType
}

export const screens: ScreenRegistryItem[] = [
  {
    id: 'dashboard',
    name: 'Дашборд',
    description: 'Баланс, активные серверы, быстрые действия и последние операции.',
    route: '/dashboard',
    component: Dashboard,
  },
  {
    id: 'server-details',
    name: 'Детали сервера',
    description: 'Конфигурация, текущая нагрузка, метрики и события сервера.',
    route: '/servers/vpn-ams-01',
    component: ServerDetails,
  },
  {
    id: 'server-create',
    name: 'Создание сервера',
    description: 'Выбор ОС, региона, тарифа и сводка будущего сервера.',
    route: '/servers/create',
    component: ServerCreate,
  },
]
