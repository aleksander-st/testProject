import styles from './Tooltip.module.css'
export function Tooltip({placement='top',children}:{placement?:'top'|'bottom';children:string}){return <div className={`${styles.root} ${styles[placement]}`} role="tooltip"><span>{children}</span><i/></div>}
