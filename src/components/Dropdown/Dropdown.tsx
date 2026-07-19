import styles from './Dropdown.module.css'
export function Dropdown({state='closed'}:{state?:'closed'|'hover'|'open'}){return <div className={`${styles.root} ${styles[state]}`}><button aria-label="Открыть меню">•••</button>{state==='open'&&<div className={styles.panel}><span>Открыть</span><span>Переименовать</span><span className={styles.destructive}>Удалить</span></div>}</div>}
