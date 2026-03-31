import NoiseOverlay from './NoiseOverlay.jsx'

function FullscreenOverlay({ onEnter }) {
  return (
    <div id="fullscreen-overlay">
      <NoiseOverlay />
      <button
        id="fullscreen-btn"
        type="button"
        onClick={onEnter}
        data-hoverable="true"
      >
        <span className="glitch" data-text="Enter!">
          Enter!
        </span>
      </button>
    </div>
  )
}

export default FullscreenOverlay
