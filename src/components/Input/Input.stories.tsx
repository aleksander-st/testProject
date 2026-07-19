import type { Meta,StoryObj } from '@storybook/react-vite'
import { Input } from './'
const states=['default','focus','disabled','error'] as const
/** Текстовое поле с label и сообщением ошибки. */
const meta={title:'Components/Input',component:Input,tags:['autodocs'],args:{label:'Имя сервера',state:'default',placeholder:'vpn-ams-01',errorMessage:'Проверьте имя сервера'},argTypes:{label:{control:'text'},state:{control:'inline-radio',options:states},placeholder:{control:'text'},errorMessage:{control:'text'},disabled:{control:'boolean'}},parameters:{layout:'centered'}} satisfies Meta<typeof Input>
export default meta
type Story=StoryObj<typeof meta>
/** Default field. */ export const Default:Story={}
/** Error field. */ export const Error:Story={args:{state:'error'}}
/** Disabled field. */ export const Disabled:Story={args:{state:'disabled'}}
/** Все состояния. */ export const AllVariants:Story={render:()=> <div className="sb-row">{states.map(state=><Input label={`Input · ${state}`} state={state} placeholder="vpn-ams-01" errorMessage="Проверьте значение" key={state}/>)}</div>}
