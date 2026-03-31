export const navItems = [
  {
    id: 'about_me',
    label: 'about_me',
    kind: 'file',
    icon: 'fas fa-info-circle',
    command: { name: 'cat', arg: 'about_me.txt' },
  },
  {
    id: 'hobbies/',
    label: 'hobbies/',
    kind: 'directory',
    icon: 'fas fa-music',
    command: { name: 'ls', arg: 'hobbies' },
  },
  {
    id: 'skills',
    label: 'skills',
    kind: 'file',
    icon: 'fas fa-code',
    command: { name: 'displayskills', arg: '' },
  },
  {
    id: 'projects/',
    label: 'projects/',
    kind: 'directory',
    icon: 'fas fa-folder-open',
    command: { name: '', arg: '' },
  },
  {
    id: 'get_in_touch/',
    label: 'get_in_touch/',
    kind: 'directory',
    icon: 'fas fa-address-book',
    command: { name: 'eza --icons', arg: '' },
    promptPath: 'contacts',
  },
  {
    id: 'credits',
    label: 'credits',
    kind: 'file',
    icon: 'fas fa-smile',
    command: { name: 'cowsaycredits', arg: '' },
  },
]

export const aboutContent = {
  schoolName: 'IIT Dhanbad',
  schoolUrl: 'https://www.iitism.ac.in/',
  resumeUrl:
    'https://drive.google.com/drive/folders/1tlwvukcALbV46JwYUYKEDPK1bbPmnIN2?usp=drive_link',
  intro:
    "Hi! I'm a CS undergrad @",
  introTail:
    ". I'm passionate about web development, low-level systems, and pretty much everything about computer science :D",
  outro:
    "When I'm not coding or diving into tech, you'll probably find me reading a good book or immersed in a great game.",
  note: '(I use Arch btw)',
}

export const skillGroups = [
  {
    title: 'Languages',
    layoutClass: 'lang',
    items: [
      { name: 'C', color: 'sapphire', icon: 'fas fa-c' },
      { name: 'C++', color: 'blue', icon: 'fas fa-code' },
      { name: 'Py', color: 'green', icon: 'fab fa-python' },
      { name: 'JS', color: 'yellow', icon: 'fab fa-js-square' },
      { name: 'TS', color: 'teal', icon: 'fab fa-js' },
    ],
  },
  {
    title: 'Frameworks / Libraries',
    layoutClass: 'lang',
    items: [
      { name: 'React', color: 'sky', icon: 'fab fa-react' },
      { name: 'Next.js', color: 'white', icon: 'fas fa-n' },
      { name: 'Node.js', color: 'green', icon: 'fab fa-node-js' },
      { name: 'Express', color: 'mauve', icon: 'fas fa-server' },
      { name: 'Tailwind', color: 'teal', icon: 'fab fa-css3' },
      { name: 'Redis', color: 'red', icon: 'fas fa-database' },
      { name: 'WS', color: 'orange', icon: 'fas fa-plug' },
    ],
  },
  {
    title: 'Tools / DevOps',
    layoutClass: 'tools',
    items: [
      { name: 'Linux', color: 'rosewater', icon: 'fab fa-linux' },
      { name: 'Git', color: 'red', icon: 'fab fa-git-alt' },
      { name: 'GitHub', color: 'mauve', icon: 'fab fa-github' },
      { name: 'MCP', color: 'lavender', icon: 'fas fa-robot' },
      { name: 'Postman', color: 'orange', icon: 'fas fa-paper-plane' },
      { name: 'NeoVim', color: 'green', icon: 'fas fa-terminal' },
      {
        name: 'Tmux',
        color: 'pink',
        icon: 'fas fa-table-cells-large',
      },
    ],
  },
  {
    title: 'CS Fundamentals',
    layoutClass: 'tools',
    items: [
      { name: 'DSA', color: 'yellow', icon: 'fas fa-diagram-project' },
      { name: 'OOP', color: 'mauve', icon: 'fas fa-cubes' },
    ],
  },
]

export const hobbies = [
  {
    name: 'coding',
    status: 'very_often',
    href: 'https://www.github.com/crypticsaiyan',
  },
  { name: 'gaming', status: 'often' },
  {
    name: 'chess',
    status: 'rarely',
    href: 'https://www.chess.com/member/organicaction',
  },
  { name: 'sketching', status: 'rarely' },
  { name: 'music', status: 'very_often' },
  { name: 'ricing', status: 'very_often' },
  {
    name: 'typing',
    status: 'very_often',
    href: 'https://monkeytype.com/profile/CryptoSaiyan',
  },
  {
    name: 'comp_prog',
    status: 'often',
    href: 'https://codeforces.com/profile/CryptoSaiyan',
  },
]

export const contacts = [
  {
    name: 'Github',
    tone: 'mauve',
    href: 'https://www.github.com/crypticsaiyan',
    icon: 'fab fa-github',
    handle: '@crypticsaiyan',
  },
  {
    name: 'Discord',
    tone: 'lavender',
    href: 'https://www.discord.com/users/uisupersaiyan3',
    icon: 'fab fa-discord',
    handle: '@uisupersaiyan3',
  },
  {
    name: 'Email',
    tone: 'red',
    href: 'mailto:crypticsaiyan@proton.me',
    icon: 'fas fa-envelope',
    handle: 'crypticsaiyan@proton.me',
  },
  {
    name: 'LinkedIn',
    tone: 'blue',
    href: 'https://www.linkedin.com/in/rahul-joshi-059a882a7/',
    icon: 'fab fa-linkedin',
    handle: 'Rahul Joshi',
  },
]

export const projects = [
  {
    id: 'mindmeld',
    name: 'MindMeld',
    image: '/assets/images/projects/mindmeld.png',
    href: 'https://crypticsaiyan.github.io/Performance-Tracker/',
    description: 'Test your cognitive skills through fun games!',
  },
  {
    id: 'spyware',
    name: 'SpyWare',
    image: '/assets/images/projects/malware.png',
    href: 'https://github.com/crypticsaiyan/wocProject',
    description: 'A spyware which uses python sockets for connections',
  },
  {
    id: 'visusort',
    name: 'VisuSort',
    image: '/assets/images/projects/visusort.png',
    href: 'https://github.com/crypticsaiyan/visusort',
    description:
      'A terminal-based interactive sorting algorithm visualizer written in C++',
  },
  {
    id: 'globseo',
    name: 'globSEO',
    image: '/assets/images/projects/globseo.png',
    href: 'https://github.com/crypticsaiyan/GlobSEO',
    description: 'Generate multilingual metadata for your website in seconds!',
  },
  {
    id: 'infoundry',
    name: 'InFoundry',
    image: '/assets/images/projects/infoundry.png',
    href: 'https://github.com/crypticsaiyan/infoundry',
    description: 'Generate Infrasturucture as Code for your repo',
  },
  {
    id: 'minesafe',
    name: 'MineSafe',
    image: '/assets/images/projects/minesafe.png',
    href: 'https://github.com/crypticsaiyan/minesafe',
    description: 'AI-Powered Mining Safety Intelligence Platform',
  },
  {
    id: 'nasa',
    name: 'Exo-huhh',
    image: '/assets/images/projects/nasa.png',
    href: 'https://github.com/armoredvortex/nasa-space-apps/',
    description: 'Classify and analyze exoplanets using AI',
  },
  {
    id: 'startpage',
    name: 'Browser Startpage',
    image: '/assets/images/projects/startpage.png',
    href: 'https://github.com/crypticsaiyan/startpage',
    description: 'Minimal browser startpage',
  },
  {
    id: 'phosphor',
    name: 'PhosPhor',
    image: '/assets/images/projects/phosphor.png',
    href: 'https://github.com/crypticsaiyan/phosphor',
    description: 'IRC client in terminal! Go back to the 90s!',
  },
  {
    id: 'xkcd',
    name: 'xkcd userscript',
    image: '/assets/images/projects/xkcd.png',
    href: 'https://github.com/crypticsaiyan/xkcd_userscript',
    description: 'Experience xkcd in dark mode!',
  },
  {
    id: 'digitrush',
    name: 'DigitRush',
    image: '/assets/images/projects/digitrush.png',
    href: 'https://github.com/crypticsaiyan/digitrush',
    description: 'Solve mental math puzzles right inside Reddit!',
  },
]

export const creditsArt = {
  desktop: {
    beforeHeart: `  _______________________________________
 < Made with lots of `,
    afterHeart: ` by CryptoSaiyan >
  ---------------------------------------
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||`,
  },
  mobile: {
    beforeHeart: `  ____________________
 < Made with lots of 
   `,
    afterHeart: ` by CryptoSaiyan >
  --------------------
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||`,
  },
}

export const preloadAssets = [
  '/assets/images/blue.png',
  '/assets/images/catppuccin-logo.png',
  '/assets/images/design.png',
  '/assets/images/frame1.png',
  '/assets/images/frame2.png',
  '/assets/images/mauve.png',
  '/assets/images/mobframe1.png',
  '/assets/images/mobframe2.png',
  '/assets/images/rainbow.png',
  '/assets/images/projects/digitrush.png',
  '/assets/images/projects/globseo.png',
  '/assets/images/projects/infoundry.png',
  '/assets/images/projects/malware.png',
  '/assets/images/projects/mindmeld.png',
  '/assets/images/projects/minesafe.png',
  '/assets/images/projects/nasa.png',
  '/assets/images/projects/phosphor.png',
  '/assets/images/projects/startpage.png',
  '/assets/images/projects/visusort.png',
  '/assets/images/projects/xkcd.png',
  '/assets/favicon/android-chrome-192x192.png',
  '/assets/favicon/android-chrome-512x512.png',
  '/assets/favicon/apple-touch-icon.png',
  '/assets/favicon/favicon-16x16.png',
  '/assets/favicon/favicon-32x32.png',
  '/assets/favicon/favicon.ico',
]
