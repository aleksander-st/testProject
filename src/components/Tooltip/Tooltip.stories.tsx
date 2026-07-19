import type { Meta,StoryObj } from '@storybook/react-vite'
import { Tooltip } from './'
const placements=['top','bottom'] as const
/** Короткая инвертированная подсказка. */
const meta={title:'Components/Tooltip',component:Tooltip,tags:['autodocs'],args:{placement:'top',children:'Скопировать IP'},argTypes:{placement:{control:'inline-radio',options:placements},children:{control:'text'}},parameters:{layout:'centered'}} satisfies Meta<typeof Tooltip>
export default meta
type Story=StoryObj<typeof meta>
/** Tooltip above target. */ export const Top:Story={}
/** Tooltip below target. */ export const Bottom:Story={args:{placement:'bottom'}}
/** Все placements. */ export const AllVariants:Story={render:()=> <div className="sb-row">{placements.map(placement=><Tooltip placement={placement} key={placement}>{placement}</Tooltip>)}</div>}
