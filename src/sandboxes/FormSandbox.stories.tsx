import { useState } from 'react'
import type { Meta,StoryObj } from '@storybook/react-vite'
import { Button,Dropdown,Input,Select } from '../components'
function FormSandbox(){const [invalid,setInvalid]=useState(false);return <form className="sb-panel" onSubmit={e=>{e.preventDefault();setInvalid(true)}}><h2 className="ds-heading-xl">Создание сервера</h2><Input label="Имя сервера" placeholder="vpn-ams-01" state={invalid?'error':'default'} errorMessage="Укажите имя сервера"/><Select label="Amsterdam" state={invalid?'error':'default'} errorMessage="Выберите локацию"/><div className="sb-row"><Dropdown state="closed"/><Button type="secondary" onClick={()=>setInvalid(false)}>Отмена</Button><Button>Создать сервер</Button></div></form>}
/** Живая форма: submit переводит поля в error, cancel сбрасывает. */
const meta={title:'Sandboxes/Форма',component:FormSandbox,tags:['autodocs'],parameters:{layout:'centered'}} satisfies Meta<typeof FormSandbox>
export default meta
type Story=StoryObj<typeof meta>
/** Форма создания сервера. */ export const ServerCreate:Story={}
