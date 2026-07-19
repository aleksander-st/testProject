import type { Meta,StoryObj } from '@storybook/react-vite'
import { Breadcrumb,Navbar,Pagination,Tabs } from '../components'
function NavigationSandbox(){return <div className="sb-panel"><Navbar active="Серверы"/><Breadcrumb items={['Серверы','vpn-ams-01','Управление']}/><Tabs items={['Обзор','Метрики','История']} active="Обзор"/><Pagination active={2}/></div>}
/** Navbar, Breadcrumb, Tabs и Pagination в контексте страницы сервера. */
const meta={title:'Sandboxes/Навигация',component:NavigationSandbox,tags:['autodocs'],parameters:{layout:'padded'}} satisfies Meta<typeof NavigationSandbox>
export default meta
type Story=StoryObj<typeof meta>
/** Навигационный контекст сервера. */ export const ServerDetails:Story={}
