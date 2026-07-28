import { createContext, useContext } from 'react'
import type {
  ActionResult,
  CreateServerInput,
  OperationRecord,
  PrototypeToastMessage,
  ServerRecord,
  ToastVariant,
} from './types'

export interface PrototypeStoreValue {
  balance: number
  forecastDays: number
  servers: ServerRecord[]
  operations: OperationRecord[]
  toast: PrototypeToastMessage | null
  createServer: (input: CreateServerInput) => Promise<ActionResult>
  restartServer: (serverId: string) => Promise<ActionResult>
  toggleServer: (serverId: string) => Promise<ActionResult>
  restartAll: () => Promise<ActionResult>
  addDemoBalance: () => void
  showToast: (variant: ToastVariant, title: string, description: string) => void
  clearToast: () => void
}

export const PrototypeStoreContext = createContext<PrototypeStoreValue | null>(null)

export function usePrototypeStore() {
  const store = useContext(PrototypeStoreContext)
  if (!store) throw new Error('usePrototypeStore must be used inside PrototypeStoreProvider')
  return store
}
