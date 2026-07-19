import styles from './StepItem.module.css'
export function StepItem({number,title,description}:{number:number;title:string;description:string}){return <div className={styles.root}><strong>{number}</strong><span><b>{title}</b><small>{description}</small></span></div>}
