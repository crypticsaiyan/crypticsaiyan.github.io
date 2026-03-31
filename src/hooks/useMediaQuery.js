import { useSyncExternalStore } from 'react'

export function useMediaQuery(query) {
  function getSnapshot() {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia(query).matches
  }

  function subscribe(callback) {
    if (typeof window === 'undefined') {
      return () => {}
    }

    const mediaQueryList = window.matchMedia(query)

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', callback)
      return () => {
        mediaQueryList.removeEventListener('change', callback)
      }
    }

    mediaQueryList.addListener(callback)
    return () => {
      mediaQueryList.removeListener(callback)
    }
  }

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
