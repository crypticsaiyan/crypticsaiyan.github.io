import { useEffect, useRef } from 'react'

const interactiveSelector = 'a, button, [data-hoverable="true"]'

function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    function handleMouseMove(event) {
      const cursor = cursorRef.current

      if (!cursor) {
        return
      }

      cursor.style.left = `${event.pageX - 20}px`
      cursor.style.top = `${event.pageY - 20}px`
      cursor.classList.toggle(
        'hover-link',
        Boolean(event.target.closest(interactiveSelector)),
      )
    }

    function handleClick() {
      const cursor = cursorRef.current

      if (!cursor) {
        return
      }

      cursor.classList.add('click')

      window.setTimeout(() => {
        cursor.classList.remove('click')
      }, 200)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return <div className="cursor" ref={cursorRef} aria-hidden="true" />
}

export default Cursor
