import styles from './Breadcrumb.module.css'
export function Breadcrumb({items}:{items:string[]}){return <nav className={styles.root} aria-label="Хлебные крошки">{items.map((item,i)=><span key={item} className={i===items.length-1?styles.current:''}>{item}{i<items.length-1&&<i>/</i>}</span>)}</nav>}
