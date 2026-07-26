import type { Meta,StoryObj } from '@storybook/react-vite'
import { Select } from './'
const states=['default','open','error','hover','disabled'] as const
/** Выбор одного значения из списка. */
const meta={title:'Components/Select',component:Select,tags:['autodocs'],args:{label:'Amsterdam',state:'default',options:['Amsterdam','Frankfurt','Warsaw'],errorMessage:'Выберите локацию'},argTypes:{label:{control:'text'},state:{control:'select',options:states},options:{control:'object'},errorMessage:{control:'text'},value:{control:'text'},onChange:{control:false},onOpenChange:{control:false}},parameters:{layout:'centered'}} satisfies Meta<typeof Select>
export default meta
type Story=StoryObj<typeof meta>
/** Default select. */ export const Default:Story={}
/** Open select. */ export const Open:Story={args:{state:'open'}}
/** Error select. */ export const Error:Story={args:{state:'error'}}
/** Disabled select. */ export const Disabled:Story={args:{state:'disabled'}}
/** Все состояния. */ export const AllVariants:Story={parameters:{layout:'padded'},render:()=> <div className="sb-row">{states.map(state=><Select label={state} state={state} key={state}/>)}</div>}
