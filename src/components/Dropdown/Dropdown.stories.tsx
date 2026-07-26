import type { Meta,StoryObj } from '@storybook/react-vite'
import { Dropdown } from './'
const states=['closed','hover','open'] as const
/** Контекстное меню действий. */
const meta={title:'Components/Dropdown',component:Dropdown,tags:['autodocs'],args:{state:'closed'},argTypes:{state:{control:'inline-radio',options:states},items:{control:'object'},highlightedItem:{control:'text'},onAction:{control:false},onOpenChange:{control:false}},parameters:{layout:'centered'}} satisfies Meta<typeof Dropdown>
export default meta
type Story=StoryObj<typeof meta>
/** Closed menu. */ export const Closed:Story={}
/** Open menu. */ export const Open:Story={args:{state:'open',highlightedItem:'console'}}
/** Все состояния. */ export const AllVariants:Story={render:()=> <div className="sb-row">{states.map(state=><Dropdown state={state} key={state}/>)}</div>}
