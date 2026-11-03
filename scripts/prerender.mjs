// Runs after the client + SSR builds: renders every route to static HTML so
// crawlers that don't execute JS (Bing, AI bots) still see the full content.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const { metaFor, prerenderPaths, render, siteUrl, stateFromPath } =
  await import(join(root, 'dist-ssr', 'entry-server.js'))

const template = await readFile(join(distDir, 'index.html'), 'utf8')

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function setMeta(html, attr, key, value) {
  const pattern = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`)

  if (!pattern.test(html)) {
    throw new Error(`prerender: <meta ${attr}="${key}"> not found in index.html`)
  }

  return html.replace(pattern, `$1${escapeHtml(value)}$2`)
}

for (const path of prerenderPaths) {
  const { activeIndex, projectIndex } = stateFromPath(path)
  const { title, description } = metaFor(activeIndex, projectIndex)
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${render(path)}</div>`,
  )

  // Sub-pages share the home page's content, so canonical stays on "/"
  // and only the title/description/share URL change.
  if (path !== '/') {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    html = setMeta(html, 'property', 'og:url', `${siteUrl}${path}`)
    html = setMeta(html, 'property', 'og:title', title)
    html = setMeta(html, 'name', 'twitter:title', title)

    if (description) {
      html = setMeta(html, 'name', 'description', description)
      html = setMeta(html, 'property', 'og:description', description)
      html = setMeta(html, 'name', 'twitter:description', description)
    }
  }

  const outFile = join(distDir, path, 'index.html')
  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(outFile, html)
  console.log(`prerendered ${path}`)
}
