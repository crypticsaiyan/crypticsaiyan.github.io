// Machine-readable descriptions of the site for search and answer engines
// (Google, Bing, ChatGPT, Claude, Perplexity). Built at prerender time from
// siteContent.js so they never drift from what the page shows.
import {
  aboutContent,
  blogUrl,
  contacts,
  hobbies,
  projects,
  skillGroups,
} from './siteContent.js'
import { siteUrl } from './routes.js'

const name = 'Rahul Joshi'
const handle = 'crypticsaiyan'
const summary =
  'Computer science undergraduate at IIT (ISM) Dhanbad, passionate about web development, low-level systems, and computer science.'
const school = {
  '@type': 'CollegeOrUniversity',
  name: 'Indian Institute of Technology (ISM) Dhanbad',
  alternateName: 'IIT Dhanbad',
  url: aboutContent.schoolUrl,
}

const ids = {
  person: `${siteUrl}/#person`,
  website: `${siteUrl}/#website`,
  profile: `${siteUrl}/#profile`,
  projects: `${siteUrl}/#projects`,
}

const skillNames = skillGroups.flatMap((group) =>
  group.items.map((item) => item.fullName ?? item.name),
)
const profileLinks = [
  ...contacts.filter((contact) => contact.href.startsWith('http')),
  ...hobbies
    .filter((hobby) => hobby.href && !hobby.href.includes('github.com'))
    .map((hobby) => ({
      name: new URL(hobby.href).hostname.replace(/^www\./, ''),
      href: hobby.href,
    })),
]
const email = contacts
  .find((contact) => contact.href.startsWith('mailto:'))
  ?.href.replace('mailto:', '')

function projectPage(project) {
  return `${siteUrl}/projects/${project.id}/`
}

// Projects hosted outside Rahul's own GitHub were team efforts
function isOwnProject(project) {
  return project.href.includes(handle)
}

export function structuredData(dateModified) {
  const person = {
    '@type': 'Person',
    '@id': ids.person,
    name,
    alternateName: [handle, 'CryptoSaiyan'],
    url: `${siteUrl}/`,
    image: `${siteUrl}/assets/images/og-image.jpg`,
    description: summary,
    jobTitle: 'Software Developer',
    email: email ? `mailto:${email}` : undefined,
    affiliation: school,
    alumniOf: school,
    knowsAbout: [
      'Web Development',
      'Low-level Systems',
      'Computer Science',
      ...skillNames,
    ],
    sameAs: [...profileLinks.map((link) => link.href), blogUrl],
  }

  const projectList = {
    '@type': 'ItemList',
    '@id': ids.projects,
    name: `Projects by ${name}`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareSourceCode',
        name: project.name,
        description: project.description,
        url: projectPage(project),
        codeRepository: project.href.includes('github.com')
          ? project.href
          : undefined,
        image: `${siteUrl}${project.image}`,
        [isOwnProject(project) ? 'author' : 'contributor']: { '@id': ids.person },
      },
    })),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': ids.website,
        url: `${siteUrl}/`,
        name: `${name} | Portfolio`,
        alternateName: handle,
        inLanguage: 'en',
        publisher: { '@id': ids.person },
      },
      {
        '@type': 'ProfilePage',
        '@id': ids.profile,
        url: `${siteUrl}/`,
        name: `${name} | Portfolio`,
        isPartOf: { '@id': ids.website },
        dateModified,
        mainEntity: { '@id': ids.person },
        hasPart: { '@id': ids.projects },
      },
      person,
      projectList,
    ],
  }
}

function markdownLink(label, href) {
  return `[${label}](${href})`
}

// https://llmstxt.org: short index an AI assistant can read in one fetch
export function llmsTxt() {
  return `# ${name} (${handle})

> ${summary}

This site is ${name}'s portfolio: about, skills, projects, and contact links.

## Profiles

${profileLinks.map((link) => `- ${markdownLink(link.name, link.href)}`).join('\n')}
- ${markdownLink('Blog', blogUrl)}
${email ? `- Email: ${email}` : ''}

## Projects

${projects
  .map(
    (project) =>
      `- ${markdownLink(project.name, project.href)}: ${project.description}`,
  )
  .join('\n')}

## Optional

- ${markdownLink('Full profile', `${siteUrl}/llms-full.txt`)}: skills, hobbies and every project in one page
- ${markdownLink('Resume', aboutContent.resumeUrl)}
`.replace(/\n{3,}/g, '\n\n')
}

// Everything on the site as plain markdown
export function llmsFullTxt() {
  return `# ${name} (${handle})

> ${summary}

## About

${aboutContent.intro} ${aboutContent.schoolName}${aboutContent.introTail}

${aboutContent.outro}

- Resume: ${aboutContent.resumeUrl}
- Website: ${siteUrl}/
- Blog: ${blogUrl}

## Skills

${skillGroups
  .map(
    (group) =>
      `- ${group.title}: ${group.items.map((item) => item.fullName ?? item.name).join(', ')}`,
  )
  .join('\n')}

## Projects

${projects
  .map(
    (project) => `### ${project.name}

${project.description}

- Source: ${project.href}
- Page: ${projectPage(project)}${isOwnProject(project) ? '' : '\n- Team project'}`,
  )
  .join('\n\n')}

## Hobbies

${hobbies
  .map(
    (hobby) =>
      `- ${hobby.name.replace('_', ' ')} (${hobby.status.replace('_', ' ')})${hobby.href ? `: ${hobby.href}` : ''}`,
  )
  .join('\n')}

## Contact

${contacts.map((contact) => `- ${contact.name}: ${contact.handle} (${contact.href})`).join('\n')}
`
}
