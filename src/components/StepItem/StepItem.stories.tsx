import type { Meta,StoryObj } from '@storybook/react-vite'
import { StepItem } from './'
/** Нумерованный шаг explainer-блока. */
const meta={title:'Components/StepItem',component:StepItem,tags:['autodocs'],args:{number:1,title:'Получите адрес',description:'Скопируйте адрес кошелька для оплаты.'},argTypes:{number:{control:{type:'number',min:1}},title:{control:'text'},description:{control:'text'}},parameters:{layout:'centered'}} satisfies Meta<typeof StepItem>
export default meta
type Story=StoryObj<typeof meta>
/** Payment step. */ export const Default:Story={}
/** Единственный вариант компонента. */ export const AllVariants:Story={render:()=> <div className="sb-stack">{[1,2,3].map(number=><StepItem number={number} title={`Шаг ${number}`} description="Описание действия" key={number}/>)}</div>}
