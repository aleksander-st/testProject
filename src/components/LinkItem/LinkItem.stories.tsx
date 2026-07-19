import type { Meta,StoryObj } from '@storybook/react-vite'
import { LinkItem } from './'
/** Текстовая ссылка с chevron-right. */
const meta={title:'Components/LinkItem',component:LinkItem,tags:['autodocs'],args:{children:'Подробнее о тарифе',href:'#details'},argTypes:{children:{control:'text'},href:{control:'text'},target:{control:'text'}},parameters:{layout:'centered'}} satisfies Meta<typeof LinkItem>
export default meta
type Story=StoryObj<typeof meta>
/** Product link. */ export const Default:Story={}
/** Единственный вариант компонента. */ export const AllVariants:Story={}
