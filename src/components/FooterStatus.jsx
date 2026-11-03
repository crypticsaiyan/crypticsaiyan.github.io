import { blogUrl } from '../data/siteContent.js'
import PermissionBits from './PermissionBits.jsx'

function FooterStatus({ item, label = '--VISITING--', labelClass = 'yellow' }) {
  const permissions =
    item.kind === 'directory' ? 'drwxr--r--' : '-rwxr--r--'

  return (
    <footer>
      <span className={labelClass}>{label}</span>
      <a
        className="footer-blog"
        href={blogUrl}
        target="_blank"
        rel="noreferrer"
        data-hoverable="true"
      >
        [blog]
      </a>
      <div>
        <PermissionBits value={permissions} className="white" />
        <span className="white">{item.id}</span>
      </div>
    </footer>
  )
}

export default FooterStatus
