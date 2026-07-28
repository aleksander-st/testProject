import { useEffect } from 'react'
import { Toast } from './components'
import { usePrototypeStore } from './data/PrototypeStoreContext'
import styles from './PrototypeToast.module.css'

export function PrototypeToast() {
  const { toast, clearToast } = usePrototypeStore()

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(clearToast, 4200)
    return () => window.clearTimeout(timer)
  }, [clearToast, toast])

  if (!toast) return null

  return (
    <div className={styles.viewport} aria-live="polite">
      <Toast
        variant={toast.variant}
        title={toast.title}
        description={toast.description}
        onClose={clearToast}
      />
    </div>
  )
}
