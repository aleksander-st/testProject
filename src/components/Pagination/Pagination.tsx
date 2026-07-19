import styles from './Pagination.module.css'
export function Pagination({active=2}:{active?:number}){return <nav className={styles.root} aria-label="Пагинация">{['‹',1,2,3,'…',12,'›'].map((item,i)=><button className={item===active?styles.active:''} key={`${item}-${i}`}>{item}</button>)}</nav>}
