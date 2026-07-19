import type { Meta,StoryObj } from '@storybook/react-vite'
import { Server } from 'lucide-react'
import { Badge,Input,Modal } from '../components'
function ModalSandbox(){return <div className="sb-panel"><div className="sb-row"><Server aria-hidden="true"/><Badge variant="warning">Требует подтверждения</Badge></div><Modal title="Переустановить сервер"><div className="sb-stack"><Input label="Имя сервера" value="vpn-ams-01" readOnly/><Input label="Подтверждение" placeholder="Введите имя сервера" state="error" errorMessage="Имена не совпадают"/></div></Modal></div>}
/** Реальная композиция Modal, Input, Badge и встроенных Button. */
const meta={title:'Sandboxes/Модальное окно',component:ModalSandbox,tags:['autodocs'],parameters:{layout:'centered'}} satisfies Meta<typeof ModalSandbox>
export default meta
type Story=StoryObj<typeof meta>
/** Сценарий переустановки сервера. */ export const ReinstallServer:Story={}
