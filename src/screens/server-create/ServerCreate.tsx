import { useState, type FormEvent } from 'react'
import { Breadcrumb, Input, OptionCard, Select } from '../../components'
import { operatingSystems, plans, regions, sshKeys } from '../../data/mockData'
import { usePrototypeStore } from '../../data/PrototypeStoreContext'
import { navigate } from '../../navigation'
import { ProductHeader } from '../shared/ProductHeader'
import { PlanCard } from './parts/PlanCard'
import { RegionOption } from './parts/RegionOption'
import { SectionHeading } from './parts/SectionHeading'
import { ServerSummary } from './parts/ServerSummary'
import styles from './ServerCreate.module.css'

export function ServerCreate() {
  const {
    balance,
    forecastDays,
    createServer,
    showToast,
  } = usePrototypeStore()
  const [selectedOsId, setSelectedOsId] = useState('ubuntu')
  const [selectedRegionId, setSelectedRegionId] = useState('ams')
  const [selectedPlanId, setSelectedPlanId] = useState('standard')
  const [selectedKey, setSelectedKey] = useState(sshKeys[0])
  const [serverName, setServerName] = useState('ubuntu-ams-03')
  const [nameCustomized, setNameCustomized] = useState(false)
  const [nameError, setNameError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedOs = operatingSystems.find(item => item.id === selectedOsId) ?? operatingSystems[0]
  const selectedRegion = regions.find(item => item.id === selectedRegionId) ?? regions[0]
  const selectedPlan = plans.find(item => item.id === selectedPlanId) ?? plans[1]

  const updateGeneratedName = (osId: string, regionId: string) => {
    if (!nameCustomized) setServerName(`${osId}-${regionId}-03`)
  }

  const selectOs = (osId: string) => {
    setSelectedOsId(osId)
    updateGeneratedName(osId, selectedRegionId)
  }

  const selectRegion = (regionId: string) => {
    setSelectedRegionId(regionId)
    updateGeneratedName(selectedOsId, regionId)
  }

  const validateName = () => {
    const value = serverName.trim()
    if (!value) return 'Введите имя сервера'
    if (value.length > 32) return 'Не больше 32 символов'
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
      return 'Только строчные латинские буквы, цифры и дефисы'
    }
    return ''
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError('')
    const validationMessage = validateName()
    setNameError(validationMessage)
    if (validationMessage) return

    setIsSubmitting(true)
    const result = await createServer({
      osId: selectedOs.id,
      regionId: selectedRegion.id,
      planId: selectedPlan.id,
      sshKey: selectedKey,
      name: serverName.trim(),
    })
    setIsSubmitting(false)

    if (!result.ok) {
      setSubmitError(result.message ?? 'Не удалось создать сервер')
      if (result.message?.includes('именем')) setNameError(result.message)
      return
    }

    navigate('/dashboard')
  }

  return (
    <main className={styles.page}>
      <ProductHeader />

      <header className={styles.pageHeader}>
        <Breadcrumb items={['Серверы', 'Создать']} />
        <h1 className="ds-heading-3xl">Создание сервера</h1>
      </header>

      <form className={styles.body} onSubmit={handleSubmit}>
        <div className={styles.form}>
          <section className={styles.section} aria-labelledby="os-heading">
            <SectionHeading
              id="os-heading"
              title="Операционная система"
              description="Все дистрибутивы — Linux LTS, x86_64"
            />
            <div className={styles.osGrid}>
              {operatingSystems.map(os => (
                <OptionCard
                  key={os.id}
                  className={styles.osCard}
                  title={os.name}
                  description={os.description}
                  state={selectedOsId === os.id ? 'selected' : 'default'}
                  onClick={() => selectOs(os.id)}
                  disabled={isSubmitting}
                />
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="region-heading">
            <SectionHeading
              id="region-heading"
              title="Регион"
              description="Чем ближе — меньше задержки"
            />
            <div className={styles.regionRow}>
              {regions.map(region => (
                <RegionOption
                  key={region.id}
                  flag={region.flag}
                  city={region.city}
                  ping={`ping ${region.ping} мс`}
                  selected={selectedRegionId === region.id}
                  onClick={() => selectRegion(region.id)}
                  disabled={isSubmitting}
                />
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="plan-heading">
            <SectionHeading
              id="plan-heading"
              title="Тариф"
              description="Можно поменять позже"
            />
            <div className={styles.planGrid}>
              {plans.map(plan => (
                <PlanCard
                  key={plan.id}
                  name={plan.name}
                  cpu={plan.cpu}
                  ram={plan.ram}
                  ssd={plan.ssd}
                  traffic={plan.traffic}
                  price={`$${plan.price}`}
                  dailyPrice={plan.dailyPrice}
                  selected={selectedPlanId === plan.id}
                  popular={plan.popular}
                  onClick={() => setSelectedPlanId(plan.id)}
                  disabled={isSubmitting}
                />
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="ssh-heading">
            <SectionHeading
              id="ssh-heading"
              title="SSH-ключ"
              description="Используется для доступа к серверу по SSH"
            />
            <div className={styles.sshRow}>
              <Select
                label={selectedKey}
                value={selectedKey}
                options={sshKeys}
                onChange={setSelectedKey}
              />
              <button
                type="button"
                className={styles.addKey}
                onClick={() => showToast('info', 'SSH-ключи', 'В прототипе доступны два мок-ключа')}
              >
                + Добавить новый ключ
              </button>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="name-heading">
            <SectionHeading
              id="name-heading"
              title="Имя сервера"
              description="Автогенерация: os-region-номер. Можно изменить"
            />
            <Input
              label="Имя сервера"
              value={serverName}
              state={nameError ? 'error' : 'default'}
              errorMessage={nameError}
              maxLength={40}
              onChange={event => {
                setServerName(event.target.value)
                setNameCustomized(true)
                setNameError('')
                setSubmitError('')
              }}
            />
          </section>
        </div>

        <ServerSummary
          os={selectedOs}
          region={selectedRegion}
          plan={selectedPlan}
          sshKey={selectedKey}
          serverName={serverName}
          balance={balance}
          currentForecast={forecastDays}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      </form>
    </main>
  )
}
