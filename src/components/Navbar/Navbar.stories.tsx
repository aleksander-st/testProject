import type { Meta,StoryObj } from '@storybook/react-vite'
import { Navbar } from './'
/** Горизонтальная панель навигации CryptoVPS. */
const meta={title:'Components/Navbar',component:Navbar,tags:['autodocs'],args:{active:'Серверы'},argTypes:{active:{control:'inline-radio',options:['Серверы','Биллинг','Статус']},onChange:{control:false}},parameters:{layout:'padded'}} satisfies Meta<typeof Navbar>
export default meta
type Story=StoryObj<typeof meta>
/** Servers active. */ export const Servers:Story={}
/** Billing active. */ export const Billing:Story={args:{active:'Биллинг'}}
/** Все активные разделы. */ export const AllVariants:Story={render:()=> <div className="sb-stack">{['Серверы','Биллинг','Статус'].map(active=><Navbar active={active} key={active}/>)}</div>}
