import { useEffect } from 'react'
import Cursor from './components/Cursor.jsx'
import FooterStatus from './components/FooterStatus.jsx'
import HeroBanner from './components/HeroBanner.jsx'
import NoiseOverlay from './components/NoiseOverlay.jsx'
import { navItems } from './data/siteContent.js'
import { useMediaQuery } from './hooks/useMediaQuery.js'

// Served as /404.html; GitHub Pages returns it (with a 404 status) for any
// path that has no prerendered page.
function NotFound({ path }) {
  const isMobileLayout = useMediaQuery('(max-width: 900px)')
  const missing = path ?? window.location.pathname

  // Enter goes home, like the terminal's "cd ~" (links keep their own Enter)
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Enter' && !event.target.closest?.('a')) {
        window.location.assign('/')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <Cursor />
      <div id="main-content" className="not-found">
        <NoiseOverlay />

        <header>
          <HeroBanner />
        </header>

        <main>
          <div className="right">
            <div className="terminal">
              <div className="prompt">
                <div className="text">
                  <span className="bold red">
                    {isMobileLayout ? 'cs' : 'cryptosaiyan'}
                  </span>{' '}
                  <span className="rosewater">in</span>{' '}
                  <span className="bold pink">~</span>
                  <br />
                  <span className="bold">
                    <span className="red">$</span>
                    <span className="blue"> cd</span>
                  </span>{' '}
                  <span className="rosewater">{missing}</span>
                </div>
              </div>
              <div className="content">
                <section>
                  <h1 className="not-found-title red">
                    404: no such file or directory
                  </h1>
                  <p className="not-found-path">{missing}</p>
                  <p className="not-found-hint">
                    <span className="bold red">$</span>
                    <span className="bold blue"> ls</span>{' '}
                    <span className="rosewater">~</span>
                  </p>
                  <ul className="not-found-links">
                    {navItems.map((item) => (
                      <li key={item.id}>
                        <a className={item.kind} href={item.path}>
                          <i className={item.icon}></i> {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="not-found-hint not-found-enter">
                    press <span className="bold mauve">Enter</span> or pick a
                    file to go back
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>

        <FooterStatus
          item={{ kind: 'file', id: '404' }}
          label="--ERROR--"
          labelClass="red"
        />
      </div>
    </>
  )
}

export default NotFound
