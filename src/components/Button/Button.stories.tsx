import type { Meta,StoryObj } from '@storybook/react-vite'
import { Button } from './'
const types=['primary','secondary','ghost'] as const
const states=['default','hover','disabled','loading','focus'] as const
const labels={primary:'Primary action',secondary:'Secondary',ghost:'Ghost'} as const
/** Основная кнопка действия CryptoVPS. */
const meta={title:'Components/Button',component:Button,tags:['autodocs'],args:{type:'primary',state:'default',htmlType:'button',children:'Создать сервер'},argTypes:{type:{control:'inline-radio',options:types},state:{control:'select',options:states},htmlType:{control:'inline-radio',options:['button','submit','reset']},children:{control:'text'},disabled:{control:'boolean'}},parameters:{layout:'centered'}} satisfies Meta<typeof Button>
export default meta
type Story=StoryObj<typeof meta>
/** Primary action. */ export const Primary:Story={args:{type:'primary'}}
/** Secondary action. */ export const Secondary:Story={args:{type:'secondary'}}
/** Ghost action. */ export const Ghost:Story={args:{type:'ghost'}}
/** Disabled action. */ export const Disabled:Story={args:{state:'disabled'}}
/** Loading action. */ export const Loading:Story={args:{state:'loading'}}
/** Матрица Type × State. */ export const AllVariants:Story={parameters:{layout:'padded'},render:()=> <div className="sb-matrix"><span/>{states.map(state=><span className="sb-label" key={state}>{state}</span>)}{types.map(type=><div className="sb-matrix-row" key={type}><span className="sb-label">{type}</span>{states.map(state=><Button type={type} state={state} key={state}>{labels[type]}</Button>)}</div>)}</div>}
