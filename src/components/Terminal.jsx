import {
  aboutContent,
  contacts,
  creditsArt,
  hobbies,
  navItems,
  projects,
  skillGroups,
} from '../data/siteContent.js'
import { useSwipe } from '../hooks/useSwipe.js'
import PermissionBits from './PermissionBits.jsx'
import TerminalPrompt from './TerminalPrompt.jsx'

function AboutPanel({ isTinyWidth, isShortHeight }) {
  return (
    <div>
      {aboutContent.intro}{' '}
      <a
        target="_blank"
        href={aboutContent.schoolUrl}
        className="aboutmelink"
        rel="noreferrer"
      >
        {aboutContent.schoolName}
      </a>
      {aboutContent.introTail}
      <br />
      {isTinyWidth ? null : <br />}
      {' '}
      {aboutContent.outro}
      <br />
      {isShortHeight ? null : <br />}
      <i>{aboutContent.note}</i>
      <br />
      {isShortHeight ? null : <br />}
      <a
        href={aboutContent.resumeUrl}
        className="aboutmelink"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fas fa-download"></i> Download my resume
      </a>
    </div>
  )
}

function SkillsPanel() {
  return (
    <div className="skills">
      {skillGroups.map((group) => (
        <div key={group.title}>
          <div className="bold white">{group.title}:</div>
          <div className={group.layoutClass}>
            {group.items.map((item) => (
              <div key={item.name} style={{ color: `var(--${item.color})` }}>
                <i className={item.icon}></i>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function HobbiesPanel() {
  const statusClassNames = {
    very_often: 'blue',
    often: 'mauve',
    rarely: 'red',
  }

  return (
    <div className="habbits">
      {hobbies.map((hobby) => (
        <div className="habbititem" key={hobby.name}>
          <div className="white">
            <PermissionBits value="-rwxr--r--" />
          </div>
          <div className={statusClassNames[hobby.status]}>{hobby.status}</div>
          <div>
            {hobby.href ? (
              <a href={hobby.href} target="_blank" rel="noreferrer">
                {hobby.name}
              </a>
            ) : (
              hobby.name
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// All projects stay in the DOM so crawlers see them; only the active one shows
function ProjectsPanel({ projectIndex, onNextProject, onPreviousProject }) {
  const swipeHandlers = useSwipe({
    onSwipeLeft: onNextProject,
    onSwipeRight: onPreviousProject,
  })
  const isFirstProject = projectIndex === 0
  const isLastProject = projectIndex === projects.length - 1

  return (
    <div className="project">
      <div className="group">
        <button
          type="button"
          className="bold leftarr"
          onClick={onPreviousProject}
          style={{ visibility: isFirstProject ? 'hidden' : 'visible' }}
          data-hoverable="true"
        >
          &lt;
        </button>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="projectimage"
            hidden={index !== projectIndex}
            {...swipeHandlers}
          >
            <img
              src={project.image}
              srcSet={`${project.image.replace(/\.webp$/, '-600.webp')} 600w, ${project.image} 1200w`}
              sizes="(max-width: 900px) 340px, 480px"
              alt={`${project.name} screenshot`}
              width={500}
              height={300}
              loading={index === projectIndex ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        <button
          type="button"
          className="bold rightarr"
          onClick={onNextProject}
          style={{ visibility: isLastProject ? 'hidden' : 'visible' }}
          data-hoverable="true"
        >
          &gt;
        </button>
      </div>
      <div className="mobileprojectarrows">
        <button
          type="button"
          className="leftarr"
          onClick={onPreviousProject}
          style={{ opacity: isFirstProject ? 0.4 : 1 }}
          data-hoverable="true"
        >
          &lt;
        </button>
        <button
          type="button"
          className="rightarr"
          onClick={onNextProject}
          style={{ opacity: isLastProject ? 0.4 : 1 }}
          data-hoverable="true"
        >
          &gt;
        </button>
      </div>
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="projectname"
          hidden={index !== projectIndex}
        >
          <h3>
            <a href={project.href} target="_blank" rel="noreferrer">
              {project.name}
            </a>
          </h3>
          <div>{project.description}</div>
        </div>
      ))}
    </div>
  )
}

function ContactsPanel() {
  return (
    <div className="contact">
      {contacts.map((contact) => (
        <a
          key={contact.name}
          className={contact.tone}
          href={contact.href}
          target="_blank"
          rel="noreferrer"
        >
          <i className={contact.icon}></i>
          <div className="details">
            <div className="site">{contact.name}</div>
            <div className="userid">{contact.handle}</div>
          </div>
        </a>
      ))}
    </div>
  )
}

function CreditsPanel({ isMobileLayout }) {
  const art = isMobileLayout ? creditsArt.mobile : creditsArt.desktop

  return (
    <div className="credits">
      <div className="credits-art">
        {art.beforeHeart}
        <span className="red fas fa-heart"></span>
        {art.afterHeart}
      </div>
      <div className="used">
        <div>
          <div className="bold">icons:</div>
          <a href="https://fontawesome.com" target="_blank" rel="noreferrer">
            {isMobileLayout ? (
              'font awesome icons'
            ) : (
              <>
                <i className="fa-solid fa-font-awesome"></i>
                &nbsp;<span>font awesome</span>
              </>
            )}
          </a>
        </div>
        <div>
          <div className="bold">theme:</div>
          <a href="https://catppuccin.com/" target="_blank" rel="noreferrer">
            <img
              src="/assets/images/catppuccin-logo.webp"
              width="40"
              height="40"
              alt="Catppuccin logo"
            />
            &nbsp;<div className="mauve">catppuccin mocha</div>
          </a>
        </div>
      </div>
    </div>
  )
}

function Terminal({
  activeItem,
  isMobileLayout,
  isShortHeight,
  isTinyWidth,
  onNextProject,
  onPreviousProject,
  projectIndex,
}) {
  const panels = {
    about_me: (
      <AboutPanel isShortHeight={isShortHeight} isTinyWidth={isTinyWidth} />
    ),
    'hobbies/': <HobbiesPanel />,
    skills: <SkillsPanel />,
    'projects/': (
      <ProjectsPanel
        projectIndex={projectIndex}
        onNextProject={onNextProject}
        onPreviousProject={onPreviousProject}
      />
    ),
    'get_in_touch/': <ContactsPanel />,
    credits: <CreditsPanel isMobileLayout={isMobileLayout} />,
  }

  return (
    <div className="terminal">
      <div className="prompt">
        <TerminalPrompt
          activeItem={activeItem}
          isMobileLayout={isMobileLayout}
        />
      </div>
      <div
        className={`content${activeItem.id === 'credits' ? ' credits-content' : ''}`}
      >
        {navItems.map((item) => (
          <section key={item.id} hidden={item.id !== activeItem.id}>
            <h2 className="sr-only">{item.heading}</h2>
            {panels[item.id]}
          </section>
        ))}
      </div>
    </div>
  )
}

export default Terminal
