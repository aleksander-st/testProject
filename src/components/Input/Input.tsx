import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'
export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{ label:string; state?:'default'|'focus'|'disabled'|'error'; errorMessage?:string }
export function Input({label,state='default',errorMessage,className='',disabled,...props}:InputProps){return <label className={`${styles.root} ${styles[state]} ${className}`}><span className="ds-label-xs">{label}</span><input disabled={disabled||state==='disabled'} {...props}/>{state==='error'&&errorMessage&&<small>{errorMessage}</small>}</label>}
