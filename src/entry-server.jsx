import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import NotFound from './NotFound.jsx'

export { metaFor, prerenderPaths, siteUrl, stateFromPath } from './data/routes.js'
export { llmsFullTxt, llmsTxt, structuredData } from './data/aeo.js'

export function render(path) {
  return renderToString(<App initialPath={path} />)
}

export function renderNotFound() {
  return renderToString(<NotFound path="/404" />)
}
