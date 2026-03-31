import { useSwipe } from '../hooks/useSwipe.js'

function MobileNav({ activeIndex, items, onNext, onPrevious }) {
  const swipeHandlers = useSwipe({
    onSwipeLeft: onNext,
    onSwipeRight: onPrevious,
  })

  const canGoPrevious = activeIndex > 0
  const canGoNext = activeIndex < items.length - 1

  return (
    <div className="mobilenav">
      <div className="nav">
        <button
          type="button"
          className="carleftarr"
          onClick={onPrevious}
          style={{ opacity: canGoPrevious ? 1 : 0.4 }}
          data-hoverable="true"
        >
          &lt;
        </button>
        <div className="carousel-viewport">
          <ul
            className="carousel"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            {...swipeHandlers}
          >
            {items.map((item) => (
              <li key={item.id} className={`mobhigh ${item.kind}`}>
                <i className={item.icon}></i> {item.label}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="carrightarr"
          onClick={onNext}
          style={{ opacity: canGoNext ? 1 : 0.4 }}
          data-hoverable="true"
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default MobileNav
