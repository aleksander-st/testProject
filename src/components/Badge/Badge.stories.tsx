import type { Meta,StoryObj } from '@storybook/react-vite'
import { Badge } from './'
const variants=['success','warning','error','neutral'] as const
/** Статус-чип с цветным индикатором. */
const meta={title:'Components/Badge',component:Badge,tags:['autodocs'],args:{variant:'success',children:'Работает'},argTypes:{variant:{control:'inline-radio',options:variants},children:{control:'text'}},parameters:{layout:'centered'}} satisfies Meta<typeof Badge>
export default meta
type Story=StoryObj<typeof meta>
/** Success status. */ export const Success:Story={}
/** Warning status. */ export const Warning:Story={args:{variant:'warning',children:'Ожидает'}}
/** Error status. */ export const Error:Story={args:{variant:'error',children:'Ошибка'}}
/** Все варианты. */ export const AllVariants:Story={render:()=> <div className="sb-row">{variants.map(variant=><Badge variant={variant} key={variant}>{variant}</Badge>)}</div>}
