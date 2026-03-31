import PermissionBits from './PermissionBits.jsx'

function FooterStatus({ item }) {
  const permissions =
    item.kind === 'directory' ? 'drwxr--r--' : '-rwxr--r--'

  return (
    <footer>
      <span className="yellow">--VISITING--</span>
      <div>
        <PermissionBits value={permissions} className="white" />
        <span className="white">{item.id}</span>
      </div>
    </footer>
  )
}

export default FooterStatus
