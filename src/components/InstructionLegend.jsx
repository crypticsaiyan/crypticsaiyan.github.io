function InstructionLegend({ highlightedDirection }) {
  function keyClass(direction) {
    return highlightedDirection === direction ? `${direction} red` : direction
  }

  return (
    <div className="instructions">
      <pre
        className="bold rosewater"
        data-tooltip="Use arrow_keys/hjkl or mouse to navigate"
      >
        {'     '}
        <i className={`fas fa-arrow-up ${keyClass('upkey')}`}></i>
        {'\n     '}
        <span className={keyClass('upkey')}>k</span>
        {'\n'}
        <i className={`fas fa-arrow-left ${keyClass('leftkey')}`}></i>{' '}
        <span className={keyClass('leftkey')}>h</span>
        {'   '}
        <span className={keyClass('rightkey')}>l</span>{' '}
        <i className={`fas fa-arrow-right ${keyClass('rightkey')}`}></i>
        {'\n    '}
        <span className={keyClass('downkey')}>j</span>
        {'\n    '}
        <i className={`fas fa-arrow-down ${keyClass('downkey')}`}></i>
      </pre>
    </div>
  )
}

export default InstructionLegend
