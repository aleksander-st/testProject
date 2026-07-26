import type { Meta,StoryObj } from '@storybook/react-vite'
import { Table } from './'
const densities=['compact','default'] as const
/** Таблица биллинга со статусами. */
const meta={title:'Components/Table',component:Table,tags:['autodocs'],args:{density:'default'},argTypes:{density:{control:'inline-radio',options:densities},rows:{control:'object'},selectedHash:{control:'text'},onRowClick:{control:false}},parameters:{layout:'padded'}} satisfies Meta<typeof Table>
export default meta
type Story=StoryObj<typeof meta>
/** Default density. */ export const Default:Story={}
/** Compact density. */ export const Compact:Story={args:{density:'compact'}}
/** Все плотности. */ export const AllVariants:Story={render:()=> <div className="sb-stack">{densities.map(density=><Table density={density} key={density}/>)}</div>}
