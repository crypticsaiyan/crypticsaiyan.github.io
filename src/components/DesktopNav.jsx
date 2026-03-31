function DesktopNav({ items, activeId, onSelect }) {
  return (
    <div className="left">
      <nav>
        /
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              id={item.id}
              className={`hover ${item.kind}${item.id === activeId ? ' active' : ''}`}
              onClick={() => onSelect(item.id)}
              data-hoverable="true"
            >
              <i className={item.icon}></i> {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default DesktopNav
