import type { Meta,StoryObj } from '@storybook/react-vite'
import { Modal } from './'
/** Диалог поверх контента с реальными Button. */
const meta={title:'Components/Modal',component:Modal,tags:['autodocs'],args:{title:'Удалить сервер?',children:'Сервер vpn-ams-01 и его данные будут удалены безвозвратно.',cancelLabel:'Отмена',confirmLabel:'Удалить',confirmState:'default',confirmDisabled:false},argTypes:{title:{control:'text'},children:{control:'text'},cancelLabel:{control:'text'},confirmLabel:{control:'text'},confirmState:{control:'select',options:['default','hover','disabled','loading','focus']},confirmDisabled:{control:'boolean'},onCancel:{control:false},onConfirm:{control:false}},parameters:{layout:'centered'}} satisfies Meta<typeof Modal>
export default meta
type Story=StoryObj<typeof meta>
/** Default modal. */ export const Default:Story={}
/** Единственная матрица компонента. */ export const AllVariants:Story={}
