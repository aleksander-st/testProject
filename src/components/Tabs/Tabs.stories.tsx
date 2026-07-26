import type { Meta,StoryObj } from '@storybook/react-vite'
import { Tabs } from './'
/** Переключатель разделов внутри экрана. */
const meta={title:'Components/Tabs',component:Tabs,tags:['autodocs'],args:{items:['Обзор','Метрики','История'],active:'Обзор'},argTypes:{items:{control:'object'},active:{control:'inline-radio',options:['Обзор','Метрики','История']},hovered:{control:'inline-radio',options:['Обзор','Метрики','История']},onChange:{control:false}},parameters:{layout:'centered'}} satisfies Meta<typeof Tabs>
export default meta
type Story=StoryObj<typeof meta>
/** Overview active. */ export const Default:Story={}
/** Metrics active. */ export const Active:Story={args:{active:'Метрики'}}
/** Hover-состояние видно на вкладке «Метрики». */ export const Hover:Story={args:{hovered:'Метрики'}}
/** Default, hover и active в одной полосе. */ export const AllVariants:Story={args:{hovered:'Метрики'}}
