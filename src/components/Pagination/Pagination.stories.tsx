import type { Meta,StoryObj } from '@storybook/react-vite'
import { Pagination } from './'
/** Постраничная навигация. */
const meta={title:'Components/Pagination',component:Pagination,tags:['autodocs'],args:{active:2},argTypes:{active:{control:{type:'number',min:1,max:12}}},parameters:{layout:'centered'}} satisfies Meta<typeof Pagination>
export default meta
type Story=StoryObj<typeof meta>
/** Page two active. */ export const Default:Story={}
/** Default, active и native hover. */ export const AllVariants:Story={}
