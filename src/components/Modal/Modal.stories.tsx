import type { Meta,StoryObj } from '@storybook/react-vite'
import { Modal } from './'
/** Диалог поверх контента с реальными Button. */
const meta={title:'Components/Modal',component:Modal,tags:['autodocs'],args:{title:'Удалить сервер?',children:'Сервер vpn-ams-01 и его данные будут удалены безвозвратно.'},argTypes:{title:{control:'text'},children:{control:'text'}},parameters:{layout:'centered'}} satisfies Meta<typeof Modal>
export default meta
type Story=StoryObj<typeof meta>
/** Default modal. */ export const Default:Story={}
/** Единственная матрица компонента. */ export const AllVariants:Story={}
