import type { Meta,StoryObj } from '@storybook/react-vite'
import { CircleHelp } from 'lucide-react'
import { Table,Toast,Tooltip } from '../components'
function DataFeedbackSandbox(){return <div className="sb-panel"><div className="sb-row"><Tooltip placement="bottom">История операций</Tooltip><CircleHelp aria-hidden="true"/></div><Table density="default"/><Toast variant="success" title="Баланс пополнен" description="₽ 1 500 зачислены на ваш баланс."/></div>}
/** Таблица операций с Tooltip и Toast обратной связи. */
const meta={title:'Sandboxes/Данные и обратная связь',component:DataFeedbackSandbox,tags:['autodocs'],parameters:{layout:'padded'}} satisfies Meta<typeof DataFeedbackSandbox>
export default meta
type Story=StoryObj<typeof meta>
/** История биллинга после успешного пополнения. */ export const BillingHistory:Story={}
