import type { Meta,StoryObj } from '@storybook/react-vite'
import { Card } from './'
const types=['static','interactive'] as const;const states=['default','hover'] as const
/** Карточка-сурфейс с заголовком и содержимым. */
const meta={title:'Components/Card',component:Card,tags:['autodocs'],args:{title:'vpn-ams-01',children:'185.23.45.67 · Ubuntu 22.04 · 2 CPU / 4 GB',type:'static',state:'default'},argTypes:{title:{control:'text'},children:{control:'text'},type:{control:'inline-radio',options:types},state:{control:'inline-radio',options:states}},parameters:{layout:'centered'}} satisfies Meta<typeof Card>
export default meta
type Story=StoryObj<typeof meta>
/** Static card. */ export const Static:Story={}
/** Interactive card. */ export const Interactive:Story={args:{type:'interactive'}}
/** Матрица Type × State. */ export const AllVariants:Story={parameters:{layout:'padded'},render:()=> <div className="sb-grid">{types.flatMap(type=>states.map(state=><Card title={`${type} · ${state}`} type={type} state={state} key={`${type}-${state}`}>185.23.45.67 · Ubuntu 22.04 · 2 CPU / 4 GB</Card>))}</div>}
