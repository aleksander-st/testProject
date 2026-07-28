export type ServerStatus = 'running' | 'deploying' | 'stopped' | 'rebooting'
export type OperationTone = 'default' | 'success' | 'error' | 'action'
export type ToastVariant = 'success' | 'warning' | 'error' | 'info'

export interface OperatingSystemOption {
  id: string
  name: string
  version: string
  description: string
}

export interface RegionOptionData {
  id: string
  city: string
  code: string
  flag: string
  ping: number
}

export interface PlanOption {
  id: string
  name: string
  cpu: string
  ram: string
  ssd: string
  traffic: string
  price: number
  dailyPrice: string
  forecastImpact: number
  popular?: boolean
}

export interface ServerEvent {
  id: string
  kind: 'update' | 'login' | 'traffic' | 'power' | 'create'
  time: string
  title: string
  description: string
  tone?: 'default' | 'success' | 'warning' | 'action'
}

export interface ServerRecord {
  id: string
  name: string
  address: string
  status: ServerStatus
  osId: string
  osLabel: string
  regionId: string
  region: string
  planId: string
  planName: string
  cpu: string
  ram: string
  ssd: string
  traffic: string
  sshKey: string
  uptime: string
  createdAt: string
  events: ServerEvent[]
}

export interface OperationRecord {
  id: string
  kind: 'deposit' | 'server' | 'charge'
  time: string
  title: string
  description: string
  amount: string
  tone: OperationTone
}

export interface CreateServerInput {
  osId: string
  regionId: string
  planId: string
  sshKey: string
  name: string
}

export interface ActionResult {
  ok: boolean
  message?: string
  serverId?: string
}

export interface PrototypeToastMessage {
  id: number
  variant: ToastVariant
  title: string
  description: string
}
