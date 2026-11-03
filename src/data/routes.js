import { navItems, projects } from './siteContent.js'

export const siteUrl = 'https://crypticsaiyan.me'

const siteTitle = 'Rahul Joshi | Portfolio'
const projectsIndex = navItems.findIndex((item) => item.id === 'projects/')

export function pathFor(activeIndex, projectIndex) {
  if (activeIndex === projectsIndex) {
    return `/projects/${projects[projectIndex].id}/`
  }

  return navItems[activeIndex].path
}

// Unknown paths fall back to the home section
export function stateFromPath(pathname) {
  const path = `${pathname.replace(/\/+$/, '')}/`
  const projectMatch = path.match(/^\/projects\/([^/]+)\/$/)

  if (projectMatch) {
    const projectIndex = projects.findIndex(
      (project) => project.id === projectMatch[1],
    )

    if (projectIndex >= 0) {
      return { activeIndex: projectsIndex, projectIndex }
    }
  }

  const activeIndex = navItems.findIndex((item) => item.path === path)
  return { activeIndex: Math.max(0, activeIndex), projectIndex: 0 }
}

// Per-route title/description; null description keeps the site default
export function metaFor(activeIndex, projectIndex) {
  if (activeIndex === 0) {
    return { title: siteTitle, description: null }
  }

  if (activeIndex === projectsIndex) {
    const project = projects[projectIndex]
    return {
      title: `${project.name} | Rahul Joshi`,
      description: `${project.name} by Rahul Joshi (crypticsaiyan): ${project.description}`,
    }
  }

  return {
    title: `${navItems[activeIndex].heading} | Rahul Joshi`,
    description: null,
  }
}

// Every prerendered path; /projects/ itself shows the first project
export const prerenderPaths = [
  ...navItems.map((item) => item.path),
  ...projects.map((project) => `/projects/${project.id}/`),
]
