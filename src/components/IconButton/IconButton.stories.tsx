import type { Meta,StoryObj } from '@storybook/react-vite'
import { IconButton } from './'
const types=['primary','secondary'] as const;const states=['default','hover','disabled'] as const
/** Квадратная кнопка с плейсхолдером иконки. */
const meta={title:'Components/IconButton',component:IconButton,tags:['autodocs'],args:{type:'primary',state:'default',label:'Настройки сервера'},argTypes:{type:{control:'inline-radio',options:types},state:{control:'inline-radio',options:states},label:{control:'text'},disabled:{control:'boolean'}},parameters:{layout:'centered'}} satisfies Meta<typeof IconButton>
export default meta
type Story=StoryObj<typeof meta>
/** Primary icon action. */ export const Primary:Story={}
/** Secondary icon action. */ export const Secondary:Story={args:{type:'secondary'}}
/** Матрица Type × State. */ export const AllVariants:Story={render:()=> <div className="sb-row">{types.flatMap(type=>states.map(state=><IconButton type={type} state={state} label={`${type} ${state}`} key={`${type}-${state}`}/>))}</div>}
