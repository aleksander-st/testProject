import type { Meta,StoryObj } from '@storybook/react-vite'
import { Card } from './'
const types=['default','accent'] as const;const states=['default','hover'] as const
/** Карточка-сурфейс с заголовком и содержимым. */
const meta={title:'Components/Card',component:Card,tags:['autodocs'],args:{title:'vpn-ams-01',children:'2 vCPU · 4 GB RAM · Amsterdam',type:'default',state:'default'},argTypes:{title:{control:'text'},children:{control:'text'},type:{control:'inline-radio',options:types},state:{control:'inline-radio',options:states}},parameters:{layout:'centered'}} satisfies Meta<typeof Card>
export default meta
type Story=StoryObj<typeof meta>
/** Default card. */ export const Default:Story={}
/** Selected card. */ export const Accent:Story={args:{type:'accent'}}
/** Матрица Type × State. */ export const AllVariants:Story={parameters:{layout:'padded'},render:()=> <div className="sb-grid">{types.flatMap(type=>states.map(state=><Card title={`${type} · ${state}`} type={type} state={state} key={`${type}-${state}`}>2 vCPU · 4 GB RAM</Card>))}</div>}
