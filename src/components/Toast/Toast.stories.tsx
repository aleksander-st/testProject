import type { Meta,StoryObj } from '@storybook/react-vite'
import { Toast } from './'
const variants=['success','warning','error','info'] as const
/** Всплывающее системное уведомление. */
const meta={title:'Components/Toast',component:Toast,tags:['autodocs'],args:{variant:'info',title:'Сервер создаётся',description:'Обычно это занимает до двух минут.'},argTypes:{variant:{control:'inline-radio',options:variants},title:{control:'text'},description:{control:'text'},onClose:{control:false}},parameters:{layout:'centered'}} satisfies Meta<typeof Toast>
export default meta
type Story=StoryObj<typeof meta>
/** Informational toast. */ export const Info:Story={}
/** Success toast. */ export const Success:Story={args:{variant:'success',title:'Сервер готов'}}
/** Error toast. */ export const Error:Story={args:{variant:'error',title:'Не удалось создать сервер'}}
/** Все варианты. */ export const AllVariants:Story={render:()=> <div className="sb-stack">{variants.map(variant=><Toast variant={variant} title={variant} description="Системное уведомление" key={variant}/>)}</div>}
