import { useEffect, useRef, useState } from 'react'
import Cursor from './components/Cursor.jsx'
import DesktopNav from './components/DesktopNav.jsx'
import FooterStatus from './components/FooterStatus.jsx'
import InstructionLegend from './components/InstructionLegend.jsx'
import MobileNav from './components/MobileNav.jsx'
import NoiseOverlay from './components/NoiseOverlay.jsx'
import Terminal from './components/Terminal.jsx'
import {
  deferredPreloadAssets,
  navItems,
  projects,
} from './data/siteContent.js'
import { metaFor, pathFor, stateFromPath } from './data/routes.js'
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

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = image.onerror = resolve
    image.src = src
  })
}

// initialPath is passed when prerendering, where there is no window
function App({ initialPath }) {
  const [initialState] = useState(() =>
    stateFromPath(initialPath ?? window.location.pathname),
  )
  const [activeIndex, setActiveIndex] = useState(initialState.activeIndex)
  const [projectIndex, setProjectIndex] = useState(initialState.projectIndex)
  const [frameIndex, setFrameIndex] = useState(0)
  const [highlightedDirection, setHighlightedDirection] = useState('')

  const highlightTimeoutRef = useRef(null)
  const isMobileLayout = useMediaQuery('(max-width: 900px)')
  const isTinyWidth = useMediaQuery('(max-width: 425px)')
  const isShortHeight = useMediaQuery('(max-height: 675px)')

  const activeItem = navItems[activeIndex]
  // replaceState keeps arrow-key browsing from flooding the back button
  useEffect(() => {
    const path = pathFor(activeIndex, projectIndex)

    if (window.location.pathname !== path) {
      window.history.replaceState(null, '', path)
    }

    document.title = metaFor(activeIndex, projectIndex).title
  }, [activeIndex, projectIndex])

  // warm the cache for later frames/projects without competing with first paint
  useEffect(() => {
    function preloadDeferredAssets() {
      deferredPreloadAssets.forEach((src) => {
        void preloadImage(src)
      })
    }

    if (document.readyState === 'complete') {
      preloadDeferredAssets()
      return undefined
    }

    window.addEventListener('load', preloadDeferredAssets, { once: true })
    return () => {
      window.removeEventListener('load', preloadDeferredAssets)
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
  }, [activeItem.id])

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
      <div id="main-content">
        <NoiseOverlay />
        <div className="landscape-warning">
          <p>Please switch to portrait mode</p>
          <p>for the best experience</p>
        </div>

        <header>
          <h1 className="sr-only">Rahul Joshi (crypticsaiyan)</h1>
          <div className="hey">
            {/* <picture> lets the prerendered HTML pick the right banner for
                the screen before any JS runs */}
            <picture>
              <source
                media="(max-width: 900px)"
                srcSet={`/assets/images/mobframe${frameIndex + 1}.png`}
                width={356}
                height={164}
              />
              <img
                src={`/assets/images/frame${frameIndex + 1}.png`}
                width={895}
                height={127}
                alt="Hey, I'm Rahul"
                fetchPriority="high"
              />
            </picture>
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
    </>
  )
}

export default App
