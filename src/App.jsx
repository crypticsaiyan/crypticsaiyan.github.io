import { useEffect, useRef, useState } from 'react'
import Cursor from './components/Cursor.jsx'
import DesktopNav from './components/DesktopNav.jsx'
import FooterStatus from './components/FooterStatus.jsx'
import FullscreenOverlay from './components/FullscreenOverlay.jsx'
import InstructionLegend from './components/InstructionLegend.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import MobileNav from './components/MobileNav.jsx'
import NoiseOverlay from './components/NoiseOverlay.jsx'
import Terminal from './components/Terminal.jsx'
import { navItems, preloadAssets, projects } from './data/siteContent.js'
import { useMediaQuery } from './hooks/useMediaQuery.js'

const directionKeyMap = {
  ArrowUp: 'upkey',
  k: 'upkey',
  ArrowDown: 'downkey',
  j: 'downkey',
  ArrowLeft: 'leftkey',
  h: 'leftkey',
  ArrowRight: 'rightkey',
  l: 'rightkey',
}

function App() {
  const [stage, setStage] = useState('loading')
  const [activeIndex, setActiveIndex] = useState(0)
  const [projectIndex, setProjectIndex] = useState(0)
  const [frameIndex, setFrameIndex] = useState(0)
  const [highlightedDirection, setHighlightedDirection] = useState('')

  const highlightTimeoutRef = useRef(null)
  const isMobileLayout = useMediaQuery('(max-width: 900px)')
  const isTinyWidth = useMediaQuery('(max-width: 425px)')
  const isShortHeight = useMediaQuery('(max-height: 675px)')

  const activeItem = navItems[activeIndex]
  const heroFrames = isMobileLayout
    ? ['/assets/images/mobframe1.png', '/assets/images/mobframe2.png']
    : ['/assets/images/frame1.png', '/assets/images/frame2.png']

  useEffect(() => {
    let cancelled = false

    Promise.all(
      preloadAssets.map(
        (src) =>
          new Promise((resolve) => {
            const image = new Image()
            image.onload = image.onerror = resolve
            image.src = src
          }),
      ),
    ).then(() => {
      if (!cancelled) {
        setStage('overlay')
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  const flashInstructionKey = (direction) => {
    if (highlightTimeoutRef.current) {
      window.clearTimeout(highlightTimeoutRef.current)
    }

    setHighlightedDirection(direction)

    highlightTimeoutRef.current = window.setTimeout(() => {
      setHighlightedDirection('')
    }, 100)
  }

  const enterSite = () => {
    const rootElement = document.documentElement
    const requestFullscreen =
      rootElement.requestFullscreen?.bind(rootElement) ||
      rootElement.webkitRequestFullscreen?.bind(rootElement) ||
      rootElement.msRequestFullscreen?.bind(rootElement)

    try {
      const fullscreenPromise = requestFullscreen?.()
      fullscreenPromise?.catch?.(() => {})
    } catch {
      // Entering fullscreen is best-effort; the site should still open.
    }

    setStage('entered')
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setFrameIndex((currentFrame) => (currentFrame === 0 ? 1 : 0))
    }, 250)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isMobileLayout])

  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) {
        window.clearTimeout(highlightTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (stage !== 'overlay') {
      return undefined
    }

    function handleOverlayEnter(event) {
      if (event.key === 'Enter') {
        event.preventDefault()
        enterSite()
      }
    }

    window.addEventListener('keydown', handleOverlayEnter)
    return () => {
      window.removeEventListener('keydown', handleOverlayEnter)
    }
  }, [stage])

  useEffect(() => {
    if (stage !== 'entered') {
      return undefined
    }

    function handleKeyDown(event) {
      const direction = directionKeyMap[event.key]

      if (direction) {
        flashInstructionKey(direction)
      }

      if (event.key === 'ArrowDown' || event.key === 'j') {
        event.preventDefault()
        setActiveIndex((currentIndex) =>
          Math.min(navItems.length - 1, currentIndex + 1),
        )
      }

      if (event.key === 'ArrowUp' || event.key === 'k') {
        event.preventDefault()
        setActiveIndex((currentIndex) => Math.max(0, currentIndex - 1))
      }

      if (activeItem.id === 'projects/') {
        if (event.key === 'ArrowLeft' || event.key === 'h') {
          event.preventDefault()
          setProjectIndex((currentIndex) => Math.max(0, currentIndex - 1))
        }

        if (event.key === 'ArrowRight' || event.key === 'l') {
          event.preventDefault()
          setProjectIndex((currentIndex) =>
            Math.min(projects.length - 1, currentIndex + 1),
          )
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeItem.id, stage])

  function selectNav(id) {
    const nextIndex = navItems.findIndex((item) => item.id === id)

    if (nextIndex >= 0) {
      setActiveIndex(nextIndex)
    }
  }

  function goToPreviousNavItem() {
    setActiveIndex((currentIndex) => Math.max(0, currentIndex - 1))
  }

  function goToNextNavItem() {
    setActiveIndex((currentIndex) => Math.min(navItems.length - 1, currentIndex + 1))
  }

  function goToPreviousProject() {
    setProjectIndex((currentIndex) => Math.max(0, currentIndex - 1))
  }

  function goToNextProject() {
    setProjectIndex((currentIndex) =>
      Math.min(projects.length - 1, currentIndex + 1),
    )
  }

  return (
    <>
      <Cursor />
      {stage === 'loading' && <LoadingScreen />}
      {stage === 'overlay' && <FullscreenOverlay onEnter={enterSite} />}
      {stage === 'entered' && (
        <div id="main-content">
          <NoiseOverlay />
          <div className="landscape-warning">
            <p>Please switch to portrait mode</p>
            <p>for the best experience</p>
          </div>

          <header>
            <div className="hey">
              <img
                src={heroFrames[frameIndex]}
                width={850}
                alt="Animated intro banner"
              />
            </div>
            <InstructionLegend highlightedDirection={highlightedDirection} />
          </header>

          <main>
            <DesktopNav
              activeId={activeItem.id}
              items={navItems}
              onSelect={selectNav}
            />
            <div className="right">
              <Terminal
                activeItem={activeItem}
                isMobileLayout={isMobileLayout}
                isShortHeight={isShortHeight}
                isTinyWidth={isTinyWidth}
                onNextProject={goToNextProject}
                onPreviousProject={goToPreviousProject}
                projectIndex={projectIndex}
              />
            </div>
          </main>

          <MobileNav
            activeIndex={activeIndex}
            items={navItems}
            onNext={goToNextNavItem}
            onPrevious={goToPreviousNavItem}
          />

          <FooterStatus item={activeItem} />
        </div>
      )}
    </>
  )
}

export default App
