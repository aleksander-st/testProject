import type { Meta,StoryObj } from '@storybook/react-vite'
import { Button } from './'
const types=['primary','secondary','ghost'] as const
const states=['default','hover','pressed','disabled','error'] as const
/** Основная кнопка действия CryptoVPS. */
const meta={title:'Components/Button',component:Button,tags:['autodocs'],args:{type:'primary',state:'default',children:'Создать сервер'},argTypes:{type:{control:'inline-radio',options:types},state:{control:'select',options:states},children:{control:'text'},disabled:{control:'boolean'}},parameters:{layout:'centered'}} satisfies Meta<typeof Button>
export default meta
type Story=StoryObj<typeof meta>
/** Primary action. */ export const Primary:Story={args:{type:'primary'}}
/** Secondary action. */ export const Secondary:Story={args:{type:'secondary'}}
/** Ghost action. */ export const Ghost:Story={args:{type:'ghost'}}
/** Disabled action. */ export const Disabled:Story={args:{state:'disabled'}}
/** Матрица Type × State. */ export const AllVariants:Story={parameters:{layout:'padded'},render:()=> <div className="sb-stack">{types.map(type=><div className="sb-row" key={type}>{states.map(state=><Button type={type} state={state} key={state}>{type} · {state}</Button>)}</div>)}</div>}
