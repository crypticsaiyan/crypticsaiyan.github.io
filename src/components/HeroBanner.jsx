import { useEffect, useState } from 'react'

// Two-frame "HEY, IM RAHUL" animation
function HeroBanner() {
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setFrameIndex((currentFrame) => (currentFrame === 0 ? 1 : 0))
    }, 250)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return (
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
  )
}

export default HeroBanner
