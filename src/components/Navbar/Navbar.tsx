import styles from './Navbar.module.css'
export function Navbar({active='Серверы'}:{active?:string}){const items=['Серверы','Биллинг','Поддержка'];return <nav className={styles.root}><strong className="ds-heading-lg">CryptoVPS</strong><div>{items.map(item=><a className={item===active?styles.active:''} href={`#${item}`} key={item}>{item}</a>)}</div></nav>}
