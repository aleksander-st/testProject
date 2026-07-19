import type { Meta,StoryObj } from '@storybook/react-vite'
import { Tabs } from './'
/** Переключатель разделов внутри экрана. */
const meta={title:'Components/Tabs',component:Tabs,tags:['autodocs'],args:{items:['Обзор','Метрики','История'],active:'Обзор'},argTypes:{items:{control:'object'},active:{control:'inline-radio',options:['Обзор','Метрики','История']}},parameters:{layout:'centered'}} satisfies Meta<typeof Tabs>
export default meta
type Story=StoryObj<typeof meta>
/** Overview active. */ export const Default:Story={}
/** Metrics active. */ export const Active:Story={args:{active:'Метрики'}}
/** Default, hover (native) and active are visible in one strip. */ export const AllVariants:Story={}
