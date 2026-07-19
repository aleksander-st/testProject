import styles from './OptionCard.module.css'
export function OptionCard({title,description,state='default'}:{title:string;description:string;state?:'default'|'selected'}){return <button className={`${styles.root} ${styles[state]}`}><i/><span><strong>{title}</strong><small>{description}</small></span></button>}
