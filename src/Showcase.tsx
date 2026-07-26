import {
  Badge, Breadcrumb, Button, Card, Dropdown, IconButton, Input, LinkItem,
  Modal, Navbar, OptionCard, Pagination, Select, StepItem, Table, Tabs,
  Toast, Tooltip,
} from './components'
import styles from './Showcase.module.css'

const buttonTypes = ['primary', 'secondary', 'ghost'] as const
const buttonStates = ['default', 'hover', 'disabled', 'loading', 'focus'] as const
const iconButtonTypes = ['primary', 'secondary'] as const
const iconButtonStates = ['default', 'hover', 'disabled'] as const
const buttonLabels = {
  primary: 'Primary action',
  secondary: 'Secondary',
  ghost: 'Ghost',
} as const

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

function ComponentGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className={styles.componentGroup}><h3 className="ds-heading-lg">{title}</h3>{children}</div>
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
      <ComponentGroup title="Button">
        <div className={styles.matrixScroller}>
          <div className={styles.actionMatrix}>
            <span />
            {buttonStates.map(state=><span className={styles.matrixHeader} key={state}>{state}</span>)}
            {buttonTypes.map(type=>(
              <div className={styles.matrixRow} key={type}>
                <span className={styles.matrixLabel}>{type}</span>
                {buttonStates.map(state=>(
                  <Button className={styles.matrixButton} key={`${type}-${state}`} type={type} state={state}>
                    {buttonLabels[type]}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </ComponentGroup>
      <ComponentGroup title="IconButton">
        <div className={styles.iconMatrix}>
          <span />
          {iconButtonStates.map(state=><span className={styles.matrixHeader} key={state}>{state}</span>)}
          {iconButtonTypes.map(type=>(
            <div className={styles.matrixRow} key={type}>
              <span className={styles.matrixLabel}>{type}</span>
              {iconButtonStates.map(state=>(
                <IconButton key={`${type}-${state}`} type={type} state={state} label={`${type} ${state}`}/>
              ))}
            </div>
          ))}
        </div>
      </ComponentGroup>
    </Section>

    <Section title="Inputs">
      <ComponentGroup title="Input">
        <div className={styles.row}>{(['default','error','focus','disabled'] as const).map(state=><Input key={state} label={`Input · ${state}`} state={state} placeholder="vpn-ams-01" errorMessage="Проверьте значение"/>)}</div>
      </ComponentGroup>
      <ComponentGroup title="Select">
        <div className={styles.row}>{(['default','open','error','hover','disabled'] as const).map(state=><Select key={state} label={`Select · ${state}`} state={state}/>)}</div>
      </ComponentGroup>
      <ComponentGroup title="Dropdown">
        <div className={styles.row}>{(['closed','open','hover'] as const).map(state=><Dropdown key={state} state={state}/>)}</div>
      </ComponentGroup>
    </Section>

    <Section title="Containers">
      <ComponentGroup title="Card">
        <div className={styles.grid}>
          {(['static','interactive'] as const).flatMap(type=>(['default','hover'] as const).map(state=>(
            <Card title={`${type} · ${state}`} type={type} state={state} key={`${type}-${state}`}>
              185.23.45.67 · Ubuntu 22.04 · 2 CPU / 4 GB
            </Card>
          )))}
        </div>
      </ComponentGroup>
      <ComponentGroup title="Modal">
        <Modal title="Удалить сервер?">Действие нельзя будет отменить.</Modal>
      </ComponentGroup>
    </Section>

    <Section title="Navigation">
      <ComponentGroup title="Navbar"><Navbar/></ComponentGroup>
      <ComponentGroup title="Tabs"><Tabs items={['Обзор','Метрики','История']} active="Обзор" hovered="Метрики"/></ComponentGroup>
      <ComponentGroup title="Breadcrumb"><Breadcrumb items={['Серверы','vpn-ams-01','Управление']}/></ComponentGroup>
      <ComponentGroup title="Pagination"><Pagination active={2} hovered={3}/></ComponentGroup>
    </Section>

    <Section title="Feedback">
      <ComponentGroup title="Badge">
        <div className={styles.row}>{(['success','warning','error','neutral'] as const).map(v=><Badge key={v} variant={v}>{v}</Badge>)}</div>
      </ComponentGroup>
      <ComponentGroup title="Tooltip">
        <div className={styles.row}><Tooltip placement="top">Tooltip top</Tooltip><Tooltip placement="bottom">Tooltip bottom</Tooltip></div>
      </ComponentGroup>
      <ComponentGroup title="Toast">
        <div className={styles.stack}>{(['success','warning','error','info'] as const).map(v=><Toast key={v} variant={v} title={v} description="Системное уведомление"/>)}</div>
      </ComponentGroup>
    </Section>

    <Section title="Data">
      <ComponentGroup title="Table">
        <div className={styles.stack}><Table density="default"/><Table density="compact"/></div>
      </ComponentGroup>
    </Section>

    <Section title="Domain compositions">
      <ComponentGroup title="OptionCard">
        <div className={styles.row}><OptionCard title="Ubuntu 24.04" description="Рекомендуемый образ"/><OptionCard title="Debian 12" description="Выбранный образ" state="selected"/></div>
      </ComponentGroup>
      <ComponentGroup title="StepItem">
        <StepItem number={1} title="Получите адрес" description="Скопируйте адрес кошелька для оплаты."/>
      </ComponentGroup>
      <ComponentGroup title="LinkItem">
        <LinkItem href="#details">Подробнее о тарифе</LinkItem>
      </ComponentGroup>
    </Section>
  </main>
}
