function TerminalPrompt({ activeItem, isMobileLayout }) {
  if (activeItem.id === 'projects/') {
    return <div className="mauve bold project-prompt-title">Projects</div>
  }

  return (
    <div className="text">
      <span className="bold red">
        {isMobileLayout ? 'cs' : 'cryptosaiyan'}
      </span>{' '}
      <span className="rosewater">in</span>{' '}
      <span className="bold pink">/{activeItem.promptPath || activeItem.id}</span>
      <br />
      <span className="bold">
        <span className="red">$</span>
        <span className="blue"> {activeItem.command.name}</span>
      </span>
      {activeItem.command.arg ? (
        <span className="rosewater"> {activeItem.command.arg}</span>
      ) : null}
    </div>
  )
}

export default TerminalPrompt
