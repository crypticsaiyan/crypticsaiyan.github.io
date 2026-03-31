import { useRef } from 'react'

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }) {
  const startX = useRef(0)

  function handleTouchStart(event) {
    startX.current = event.touches[0].clientX
  }

  function handleTouchEnd(event) {
    const endX = event.changedTouches[0].clientX
    const difference = endX - startX.current

    if (Math.abs(difference) <= threshold) {
      return
    }

    if (difference > 0) {
      onSwipeRight?.()
      return
    }

    onSwipeLeft?.()
  }

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  }
}
