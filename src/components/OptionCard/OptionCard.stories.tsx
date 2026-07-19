import type { Meta,StoryObj } from '@storybook/react-vite'
import { OptionCard } from './'
const states=['default','selected'] as const
/** Карточка выбора образа или тарифа. */
const meta={title:'Components/OptionCard',component:OptionCard,tags:['autodocs'],args:{title:'Ubuntu 24.04',description:'Рекомендуемый образ',state:'default'},argTypes:{title:{control:'text'},description:{control:'text'},state:{control:'inline-radio',options:states}},parameters:{layout:'centered'}} satisfies Meta<typeof OptionCard>
export default meta
type Story=StoryObj<typeof meta>
/** Default option. */ export const Default:Story={}
/** Selected option. */ export const Selected:Story={args:{state:'selected'}}
/** Все состояния. */ export const AllVariants:Story={render:()=> <div className="sb-row">{states.map(state=><OptionCard title="Ubuntu 24.04" description={state} state={state} key={state}/>)}</div>}
