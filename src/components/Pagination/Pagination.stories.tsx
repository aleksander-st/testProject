import type { Meta,StoryObj } from '@storybook/react-vite'
import { Pagination } from './'
/** Постраничная навигация. */
const meta={title:'Components/Pagination',component:Pagination,tags:['autodocs'],args:{active:2,total:12},argTypes:{active:{control:{type:'number',min:1,max:12}},hovered:{control:{type:'number',min:1,max:12}},total:{control:{type:'number',min:1,max:50}},onChange:{control:false}},parameters:{layout:'centered'}} satisfies Meta<typeof Pagination>
export default meta
type Story=StoryObj<typeof meta>
/** Page two active. */ export const Default:Story={}
/** Зафиксированное hover-состояние страницы 3. */ export const Hover:Story={args:{hovered:3}}
/** Default, active и hover в одной композиции. */ export const AllVariants:Story={args:{active:2,hovered:3}}
