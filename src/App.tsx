import { useEffect, useState } from 'react'
import { PrototypeToast } from './PrototypeToast'
import { Showcase } from './Showcase'
import { ScreensIndex } from './screens/ScreensIndex'
import { screens } from './screens/registry'
import { ServerDetails } from './screens/server-details/ServerDetails'

export function App() {
  const [pathname, setPathname] = useState(
    () => window.location.pathname.replace(/\/+$/, '') || '/',
  )

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname.replace(/\/+$/, '') || '/')
    }

    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  let content

  if (pathname === '/showcase') {
    content = <Showcase />
  } else {
    const screen = screens.find(item => item.route === pathname)

    if (screen) {
      const Screen = screen.component
      content = <Screen />
    } else if (pathname.startsWith('/servers/')) {
      content = <ServerDetails />
    } else {
      content = <ScreensIndex />
    }
  }

  return (
    <>
      {content}
      <PrototypeToast />
    </>
  )
}
