import {
  Badge, Breadcrumb, Button, Card, Dropdown, IconButton, Input, LinkItem,
  Modal, Navbar, OptionCard, Pagination, Select, StepItem, Table, Tabs,
  Toast, Tooltip,
} from './components'
import styles from './Showcase.module.css'

const semanticColors = [
  'surface-default','surface-subtle','surface-muted','surface-action-primary',
  'surface-action-primary-hover','surface-action-secondary-hover','surface-action-ghost-hover',
  'surface-success-subtle','surface-warning-subtle','surface-error-subtle','text-default',
  'text-strong','text-muted','text-disabled','text-on-action','text-action','text-success',
  'text-warning','text-error','border-default','border-strong','border-action',
  'border-focus-ring','border-error','bg-success','bg-warning','bg-error','bg-info',
] as const

const typeStyles = [
  ['ds-heading-4xl','DS/Heading/4xl'],['ds-heading-3xl','DS/Heading/3xl'],
  ['ds-heading-2xl','DS/Heading/2xl'],['ds-heading-xl','DS/Heading/xl'],
  ['ds-heading-lg','DS/Heading/lg'],['ds-body-base','DS/Body/base'],
  ['ds-body-sm','DS/Body/sm'],['ds-body-sm-medium','DS/Body/sm Medium'],
  ['ds-body-xs','DS/Body/xs'],['ds-label-xs','DS/Label/xs'],
] as const

function Section({title,children}:{title:string;children:React.ReactNode}){
  return <section className={styles.section}><h2 className="ds-heading-2xl">{title}</h2>{children}</section>
}

export function Showcase(){
  return <main className={styles.page}>
    <header className={styles.hero}>
      <span className="ds-label-xs">React mirror · CryptoVPS</span>
      <h1 className="ds-heading-4xl">Design System</h1>
      <p className="ds-body-base">Primitive → Semantic → Components. Зеркало каталога из Figma и ds/.</p>
    </header>

    <Section title="Semantic palette">
      <div className={styles.swatches}>{semanticColors.map(name=><article className={styles.swatch} key={name}><div style={{background:`var(--${name})`}}/><code>{name}</code></article>)}</div>
    </Section>

    <Section title="Typography">
      <div className={styles.typeScale}>{typeStyles.map(([className,name])=><div key={name}><code>{name}</code><p className={className}>Сервер готов к работе</p></div>)}</div>
    </Section>

    <Section title="Actions">
      <div className={styles.row}>{(['primary','secondary','ghost'] as const).flatMap(type=>(['default','hover','pressed','disabled','error'] as const).map(state=><Button key={`${type}-${state}`} type={type} state={state}>{type} · {state}</Button>))}</div>
      <div className={styles.row}>{(['primary','secondary'] as const).flatMap(type=>(['default','hover','disabled'] as const).map(state=><IconButton key={`${type}-${state}`} type={type} state={state} label={`${type} ${state}`}/>))}</div>
    </Section>

    <Section title="Inputs">
      <div className={styles.row}>{(['default','focus','disabled','error'] as const).map(state=><Input key={state} label={`Input · ${state}`} state={state} placeholder="vpn-ams-01" errorMessage="Проверьте значение"/>)}</div>
      <div className={styles.row}>{(['default','hover','focus','open','error'] as const).map(state=><Select key={state} label={`Select · ${state}`} state={state}/>)}</div>
      <div className={styles.row}>{(['closed','hover','open'] as const).map(state=><Dropdown key={state} state={state}/>)}</div>
    </Section>

    <Section title="Containers">
      <div className={styles.grid}><Card title="Default card">Описание карточки из дизайн-системы.</Card><Card title="Selected card" type="accent" state="hover">Акцентная карточка в hover.</Card></div>
      <Modal title="Удалить сервер?">Действие нельзя будет отменить.</Modal>
    </Section>

    <Section title="Navigation">
      <Navbar/><Tabs items={['Обзор','Метрики','История']} active="Обзор"/>
      <Breadcrumb items={['Серверы','vpn-ams-01','Управление']}/><Pagination active={2}/>
    </Section>

    <Section title="Feedback">
      <div className={styles.row}>{(['success','warning','error','neutral'] as const).map(v=><Badge key={v} variant={v}>{v}</Badge>)}</div>
      <div className={styles.row}><Tooltip placement="top">Tooltip top</Tooltip><Tooltip placement="bottom">Tooltip bottom</Tooltip></div>
      <div className={styles.stack}>{(['success','warning','error','info'] as const).map(v=><Toast key={v} variant={v} title={v} description="Системное уведомление"/>)}</div>
    </Section>

    <Section title="Data">
      <Table density="default"/><Table density="compact"/>
    </Section>

    <Section title="Domain compositions">
      <div className={styles.row}><OptionCard title="Ubuntu 24.04" description="Рекомендуемый образ"/><OptionCard title="Debian 12" description="Выбранный образ" state="selected"/></div>
      <StepItem number={1} title="Получите адрес" description="Скопируйте адрес кошелька для оплаты."/>
      <LinkItem href="#details">Подробнее о тарифе</LinkItem>
    </Section>
  </main>
}
