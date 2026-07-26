import { useState } from 'react'
import styles from './Select.module.css'

export interface SelectProps {
  label: string
  state?: 'default' | 'hover' | 'open' | 'error' | 'disabled'
  options?: string[]
  errorMessage?: string
  value?: string
  onChange?: (value: string) => void
  onOpenChange?: (open: boolean) => void
}

export function Select({
  label,
  state = 'default',
  options = ['Amsterdam', 'Frankfurt', 'Warsaw'],
  errorMessage = 'Выберите значение',
  value,
  onChange,
  onOpenChange,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(label)
  const [internalOpen, setInternalOpen] = useState(false)
  const isDisabled = state === 'disabled'
  const isForcedOpen = state === 'open'
  const isOpen = isForcedOpen || internalOpen
  const selectedValue = value ?? internalValue

  const setOpen = (open: boolean) => {
    if (!isForcedOpen) setInternalOpen(open)
    onOpenChange?.(open)
  }

  const choose = (option: string) => {
    setInternalValue(option)
    onChange?.(option)
    setOpen(false)
  }

  return (
    <div className={`${styles.root} ${styles[state]}`}>
      <button
        type="button"
        disabled={isDisabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={state === 'error' || undefined}
        onClick={() => setOpen(!isOpen)}
      >
        <span>{isDisabled ? 'недоступно' : selectedValue}</span>
        <i />
      </button>
      {isOpen && (
        <div className={styles.panel} role="listbox">
          {options.map(option => (
            <button
              type="button"
              role="option"
              aria-selected={option === selectedValue}
              className={option === selectedValue ? styles.selected : ''}
              onClick={() => choose(option)}
              key={option}
            >
              {option}
              {option === selectedValue && <i />}
            </button>
          ))}
        </div>
      )}
      {state === 'error' && <small>{errorMessage}</small>}
    </div>
  )
}
