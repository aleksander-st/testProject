import styles from './Tabs.module.css'
export function Tabs({items,active}:{items:string[];active:string}){return <div className={styles.root}>{items.map(item=><button className={item===active?styles.active:''} key={item}>{item}</button>)}</div>}
