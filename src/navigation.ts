import type { MouseEvent } from 'react'

export function navigate(path: string, options?: { replace?: boolean }) {
  if (options?.replace) {
    window.history.replaceState({}, '', path)
  } else {
    window.history.pushState({}, '', path)
  }
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function handleInternalLink(
  event: MouseEvent<HTMLAnchorElement>,
  path: string,
) {
  if (
    event.defaultPrevented
    || event.button !== 0
    || event.metaKey
    || event.ctrlKey
    || event.shiftKey
    || event.altKey
  ) return

  event.preventDefault()
  navigate(path)
}
