import type { Meta,StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from './'
/** Путь по иерархии страниц. */
const meta={title:'Components/Breadcrumb',component:Breadcrumb,tags:['autodocs'],args:{items:['Серверы','vpn-ams-01','Управление']},argTypes:{items:{control:'object'}},parameters:{layout:'centered'}} satisfies Meta<typeof Breadcrumb>
export default meta
type Story=StoryObj<typeof meta>
/** Product path. */ export const Default:Story={}
/** Default и current items в одной композиции. */ export const AllVariants:Story={}
