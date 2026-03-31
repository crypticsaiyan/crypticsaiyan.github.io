const permissionColorClasses = {
  d: 'orange',
  r: 'yellow',
  w: 'red',
  x: 'green',
}

function PermissionBits({ value, className = '' }) {
  return (
    <span className={className}>
      {value.split('').map((character, index) => (
        <span
          key={`${character}-${index}`}
          className={permissionColorClasses[character] || undefined}
        >
          {character}
        </span>
      ))}
    </span>
  )
}

export default PermissionBits
