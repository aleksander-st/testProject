import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb, Navbar, Pagination, Tabs } from '../components'
import styles from './Sandboxes.module.css'

const tabsBySection: Record<string, string[]> = {
  Серверы: ['Обзор', 'Метрики', 'История'],
  Биллинг: ['Операции', 'Способы оплаты', 'Документы'],
  Статус: ['Системы', 'Инциденты', 'Обслуживание'],
}

function NavigationSandbox() {
  const [section, setSection] = useState('Серверы')
  const [tab, setTab] = useState(tabsBySection.Серверы[0])
  const [page, setPage] = useState(1)
  const tabs = tabsBySection[section]

  const changeSection = (nextSection: string) => {
    setSection(nextSection)
    setTab(tabsBySection[nextSection][0])
    setPage(1)
  }

  const changeTab = (nextTab: string) => {
    setTab(nextTab)
    setPage(1)
  }

  return (
    <div className={styles.shell}>
      <header className={styles.headerCopy}>
        <h2 className="ds-heading-xl">Навигация по продукту</h2>
        <p>Navbar, Tabs и Pagination управляют одним контекстом и обновляют Breadcrumb.</p>
      </header>

      <div className={styles.navigationFrame}>
        <Navbar active={section} onChange={changeSection} />
        <Breadcrumb items={[section, tab, `Страница ${page}`]} />
        <Tabs items={tabs} active={tab} onChange={changeTab} />

        <main className={styles.pageContent} aria-live="polite">
          <span className="ds-label-xs">{section} / {tab}</span>
          <strong>Страница {page} из 12</strong>
          <p className={styles.muted}>
            Содержимое обновилось после выбора раздела, вкладки или страницы.
          </p>
        </main>

        <div className={styles.paginationRow}>
          <span className={styles.statusText}>Показана страница {page}</span>
          <Pagination active={page} total={12} onChange={setPage} />
        </div>
      </div>
    </div>
  )
}

/** Связанный navigation workflow: раздел → вкладка → breadcrumb → страница. */
const meta = {
  title: 'Sandboxes/Навигация',
  component: NavigationSandbox,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof NavigationSandbox>

export default meta
type Story = StoryObj<typeof meta>

/** Переключайте Navbar, Tabs, номера страниц и стрелки Pagination. */
export const ServerDetails: Story = {}
