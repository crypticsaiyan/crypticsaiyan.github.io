// function to make the hey text blink
let frame = document.createElement("img");

const mediaQuery = window.matchMedia("(max-width: 900px)");
const mediaQuery2 = window.matchMedia("(max-width: 425px)");
const mediaQuery3 = window.matchMedia("(max-height: 675px)");
if (!mediaQuery.matches) frame.src = "assets/images/frame1.png";
else frame.src = "assets/images/mobframe1.png";

let hey = document.querySelector(".hey");
hey.append(frame);
function blinkHey() {
  setInterval(() => {
    if (!mediaQuery.matches) {
      if (frame.src.endsWith("frame1.png"))
        frame.src = "assets/images/frame2.png";
      else frame.src = "assets/images/frame1.png";
    } else {
      if (frame.src.endsWith("mobframe1.png"))
        frame.src = "assets/images/mobframe2.png";
      else frame.src = "assets/images/mobframe1.png";
    }
  }, 250);
}
blinkHey();

//function to change noise color
let noisecont = document.querySelector(".noisecont");
function changeNoise(color) {
  noisecont.style.setProperty(
    "--noise-url",
    `url(/assets/images/${color}.png)`
  );
}
//function to update status in footer
let permissions = document.querySelector("footer div").firstElementChild;
let filename = document.querySelector("footer div").lastElementChild;

function updateFooter(element) {
  let x;
  if (element.classList.contains("file")) {
    x = `-rwxr--r--`;
    filename.innerText = items[itemIndex].id;
    // changeNoise("rainbow")
  }
  if (element.classList.contains("directory")) {
    x = "drwxr--r--";
    filename.innerText = items[itemIndex].id;
    // changeNoise("mauve")
  }
  permissions.innerHTML = colorise(x);
}

//colorise
function colorise(x) {
  const colorMap = {
    r: "yellow",
    w: "red",
    x: "green",
    d: "orange",
  };

  return x.replace(
    /([drwx])/g,
    (match) => `<span class="${colorMap[match]}">${match}</span>`
  );
}

// move in nav using j, k or up, down keys
let items = Array.from(document.querySelectorAll(".left ul li"));
let itemIndex = 0;
items[0].classList.add("active");
updateFooter(items[0]);
document.addEventListener("keydown", (KeyboardEvent) => {
  if (KeyboardEvent.key == "ArrowDown" || KeyboardEvent.key == "j") {
    if (itemIndex != items.length - 1) {
      items[itemIndex].classList.toggle("active");
      itemIndex++;
      items[itemIndex].classList.toggle("active");
    }
  }
  if (KeyboardEvent.key == "ArrowUp" || KeyboardEvent.key == "k") {
    if (itemIndex != 0) {
      items[itemIndex].classList.toggle("active");
      itemIndex--;
      items[itemIndex].classList.toggle("active");
    }
  }
  updateFooter(items[itemIndex]);
  updateTerminal(items[itemIndex].id);
});

//function to handle clicking in nav
document.querySelector("ul").addEventListener("click", (event) => {
  if (event.target.tagName == "LI") {
    items[itemIndex].classList.toggle("active");
    itemIndex = items.indexOf(event.target);
    items[itemIndex].classList.toggle("active");
    updateFooter(items[itemIndex]);
    updateTerminal(items[itemIndex].id);
  }
});

const mappings = {
  about_me: ["cat", "about_me.txt"],
  skills: ["displayskills", ""],
  "hobbies/": ["ls", "hobbies"],
  "get_in_touch/": ["eza --icons", ""],
  credits: ["cowsaycredits", ""],
};

// function to update terminal

const projects = {
  mindmeld: [
    "MindMeld",
    "/assets/images/mindmeld.png",
    "https://crypticsaiyan.github.io/Performance-Tracker/",
    "Test your cognitive skills through fun games!",
  ],
  spyware: [
    "SpyWare",
    "/assets/images/malware.png",
    "https://github.com/crypticsaiyan/wocProject",
    "A spyware which uses python sockets for connections.",
  ],
};

let terminal = document.querySelector(".terminal");
function updateTerminal(id) {
  if (id != "projects/") {
    terminal.firstElementChild.innerHTML = `
              <div class="text">
              <span class="bold red">╭─${
                mediaQuery.matches ? "cs" : "cryptosaiyan"
              }</span>
              <span class="rosewater">in</span>
              <span class="bold pink">/${
                mediaQuery && id == "get_in_touch/" ? "contacts" : id
              }</span><br />
              <span class="bold"
                ><span class="red">╰─λ</span
                ><span class="blue"> ${mappings[id][0]}</span></span
              >
              <span class="rosewater">${mappings[id][1]}</span>
            </div>
  `;
  } else {
    terminal.firstElementChild.innerHTML = `
    <div class="mauve bold" style="text-align: center;font-size: var(--large);">Projects</div>
    `;
  }
  if (id == "about_me") {
    terminal.lastElementChild.innerHTML = `
                Hi! I'm a CS undergrad @ <a target="_blank" href="https://www.iitism.ac.in/" class="aboutmelink">IIT Dhanbad</a>.
            I'm passionate about cybersecurity, web development, and everything about computer science :D</br>${
              mediaQuery2.matches ? "" : "<br>"
            } When I'm not coding or diving
            into tech, you'll probably find me reading a good book or immersed
            in a great game.</br>${
              mediaQuery3.matches ? "" : "<br>"
            } Oh, and yes — I use
            <i class="nf nf-md-arch"></i> btw.<br>${
              mediaQuery3.matches ? "" : "<br>"
            }<a href="" class="aboutmelink"><i class="nf nf-md-download"></i> Download my resume</a>
    `;
  } else if (id == "skills") {
    // Improved skills section: more structured, easier to extend, DRY
    const skills = {
      Languages: [
        { name: "HTML", color: "orange", icon: "nf nf-dev-html5" },
        { name: "CSS", color: "blue", icon: "nf nf-dev-css3" },
        { name: "JS", color: "yellow", icon: "nf nf-fa-js" },
        { name: "C", color: "blue", icon: "nf nf-custom-c" },
        { name: "C++", color: "sapphire", icon: "nf nf-custom-cpp" },
        { name: "Python", color: "green", icon: "nf nf-dev-python" },
      ],
      Tools: [
        { name: "Linux", color: "black", icon: "nf nf-dev-linux" },
        { name: "Git", color: "red", icon: "nf nf-dev-git" },
        { name: "GitHub", color: "mauve", icon: "nf nf-cod-github" },
        { name: "Neovim", color: "green", icon: "nf nf-custom-neovim" },
        { name: "Arch", color: "white", icon: "nf nf-md-arch" },
      ],
    };

    function renderSkillGroup(title, items, groupClass) {
      return `
      <div class="bold white">${title}:</div>
      <div class="${groupClass}">
        ${items
          .map(
            (s) =>
              `<div class="${s.color}">
            <i class="${s.icon}"></i><span>${s.name}</span>
          </div>`
          )
          .join("")}
      </div>
      `;
    }

    terminal.lastElementChild.innerHTML = `
      <div class="skills">
      ${renderSkillGroup("Languages", skills.Languages, "lang")}
      ${renderSkillGroup("Tools", skills.Tools, "tools")}
      </div>
    `;
  } else if (id == "hobbies/") {
    const hobcol = {
      very_often: "blue",
      often: "mauve",
      rarely: "red",
    };
    const colperm = colorise("-rwxr--r--");
    function hobb(status, name, cl) {
      let x = document.createElement("div");
      x.classList.add("habbititem");
      if (cl) {
        x.innerHTML = `
                <div class="white">${colperm}</div>
                <div class="${hobcol[status]}">${status}</div>
                <div class="link"><a href="${cl}" target="_blank">${name}</a></div>
        `;
      } else
        x.innerHTML = `
                <div class="white">${colperm}</div>
                <div class="${hobcol[status]}">${status}</div>
                <div>${name}</div>
      `;
      return x;
    }
    const hobblist = {
      coding: "very_often",
      gaming: "often",
      chess: "rarely",
      sketching: "rarely",
      music: "very_often",
      ricing: "very_often",
      typing: "very_often",
      comp_prog: "often",
    };
    let y = document.createElement("div");
    y.className = "habbits";
    const link = {
      coding: "https://www.github.com/crypticsaiyan",
      chess: "https://www.chess.com/member/organicaction",
      typing: "https://monkeytype.com/profile/CryptoSaiyan",
      comp_prog: "https://codeforces.com/profile/CryptoSaiyan",
    };
    for (i in hobblist) {
      if (i == "coding" || i == "chess" || i == "typing" || i == "comp_prog") {
        y.append(hobb(hobblist[i], i, (cl = link[i])));
      } else y.append(hobb(hobblist[i], i));
    }
    terminal.lastElementChild.replaceChildren(y);
  } else if (id == "projects/") {
    changeProject(currProjectIndex);
  } else if (id == "get_in_touch/") {
    const contactlist = {
      github: [
        "Github",
        "mauve",
        "https://www.github.com/crypticsaiyan",
        "nf-cod-github",
        "@crypticsaiyan",
      ],
      discord: [
        "Discord",
        "lavender",
        "https://www.discord.com/users/uisupersaiyan3",
        "nf-fa-discord",
        "@uisupersaiyan3",
      ],
      email: [
        "Email",
        "red",
        "mailto:crypticsaiyan@proton.me",
        "nf-md-email_outline",
        "crypticsaiyan@proton.me",
      ],
      instagram: [
        "Instagram",
        "pink",
        "https://www.instagram.com/mightberahul",
        "nf-fa-instagram",
        "@mightberahul",
      ],
      linkedin: [
        "LinkedIn",
        "blue",
        "https://www.linkedin.com/in/rahul-joshi-059a882a7/",
        "nf-dev-linkedin",
        "Rahul Joshi",
      ],
      reddit: [
        "Reddit",
        "orange",
        "https://www.reddit.com/user/uisupersaiyan-3/",
        "nf-fa-reddit",
        "@uisupersaiyan-3",
      ],
    };
    let contacts = document.createElement("div");
    contacts.className = "contact";
    for (i in contactlist) {
      let card = document.createElement("a");
      card.classList.add(contactlist[i][1]);
      card.href = contactlist[i][2];
      card.target = "_blank";
      card.innerHTML = `
                <i class="nf ${contactlist[i][3]}"></i>
                <div class="details">
                  <div class="site">${contactlist[i][0]}</div>
                  <div class="userid">${contactlist[i][4]}</div>
                </div>
      `;
      contacts.append(card);
    }
    terminal.lastElementChild.replaceChildren(contacts);
  } else if (id == "credits") {
    terminal.lastElementChild.innerHTML = `
    <div class="credits">
            <div style="white-space: pre;">
  _______________________________________
 < Made with lots of <span class="red nf nf-cod-heart"></span> by CryptoSaiyan >
  ---------------------------------------
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
            </div>
            <div class="used">
              <div>
              <div class="bold">icons:</div><a href="https://www.nerdfonts.com" target="_blank">nerdfont icons</a>
              </div>
              <div>
              <div class="bold">theme:</div><a href="https://catppuccin.com/" target="_blank"><img src="/assets/images/catppuccin-logo.png" width="40" height="40" alt="catppuccin-logo">&nbsp;<div class = "mauve">catppuccin mocha</div></a>
              </div>
            </div>
            </div>
    `;
    if (mediaQuery.matches) {
      terminal.lastElementChild.innerHTML = `
    <div class="credits">
            <div style="white-space: pre;">
  ____________________
 < Made with lots of 
   <span class="red nf nf-cod-heart"></span> by CryptoSaiyan >
  --------------------
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||
            </div>
            <div class="used">
              <div>
              <div class="bold">icons:</div><a href="https://www.nerdfonts.com" target="_blank">nerdfont icons</a>
              </div>
              <div>
              <div class="bold">theme:</div><a href="https://catppuccin.com/" target="_blank"><img src="/assets/images/catppuccin-logo.png" width="40" height="40" alt="catppuccin-logo">&nbsp;<div class = "mauve">catppuccin mocha</div></a>
              </div>
            </div>
            </div>
    `;
    }
  }
}

let currProjectIndex = 0;
const projectkeys = Object.keys(projects);
function changeProject(currProjectIndex) {
  projectname = projectkeys[currProjectIndex];
  terminal.lastElementChild.innerHTML = `
  <div class="project">
  <div class="group">
  <div class="bold leftarr">&lt;</div>
  <div class="projectimage">
  <img
  src="${projects[projectname][1]}"
  width="500px"
  alt="${projects[projectname][0]}"
  />
  </div>
  <div class="bold rightarr">&gt;</div>
  </div>
  <div class="mobileprojectarrows">
  <div class="leftarr">&lt;</div>
  <div class="rightarr">&gt;</div>
  </div>
  <div class="projectname">
  <a href="${projects[projectname][2]}"
  target="_blank">${projects[projectname][0]}</a
  >
  <div>${projects[projectname][3]}</div>
  </div>
  </div>
  `;
  if (currProjectIndex == 0) {
    terminal.lastElementChild.querySelector(".leftarr").style.visibility =
      "hidden";
    terminal.lastElementChild.querySelector(
      ".mobileprojectarrows .leftarr"
    ).style.opacity = "0.4";
  }
  if (currProjectIndex == projectkeys.length - 1) {
    terminal.lastElementChild.querySelector(".rightarr").style.visibility =
      "hidden";
    terminal.lastElementChild.querySelector(
      ".mobileprojectarrows .rightarr"
    ).style.opacity = "0.4";
  }
}
terminal.addEventListener("click", (event) => {
  if (document.getElementById("projects/").classList.contains("active")) {
    if (event.target.classList.contains("leftarr")) {
      if (currProjectIndex > 0) {
        changeProject(--currProjectIndex);
      }
    }
    if (event.target.classList.contains("rightarr")) {
      if (currProjectIndex < projectkeys.length - 1) {
        changeProject(++currProjectIndex);
      }
    }
  }
  if (event.target.classList.contains("leftarr")) {
    if (currProjectIndex > 0) {
      changeProject(--currProjectIndex);
    }
  }
  if (event.target.classList.contains("rightarr")) {
    if (currProjectIndex < projectkeys.length - 1) {
      changeProject(++currProjectIndex);
    }
  }
});
document.addEventListener("keydown", (event) => {
  if (document.getElementById("projects/").classList.contains("active")) {
    if (event.key === "ArrowLeft" || event.key === "h") {
      if (currProjectIndex > 0) {
        changeProject(--currProjectIndex);
      }
    }
    if (event.key === "ArrowRight" || event.key == "l") {
      if (currProjectIndex < projectkeys.length - 1) {
        changeProject(++currProjectIndex);
      }
    }
  }
});

function highlightInstructionKey(key) {
  const map = {
    ArrowUp: "upkey",
    k: "upkey",
    ArrowDown: "downkey",
    j: "downkey",
    ArrowLeft: "leftkey",
    h: "leftkey",
    ArrowRight: "rightkey",
    l: "rightkey",
  };
  const cls = map[key];
  const instr = document.querySelector("header .instructions pre");
  if (!cls || !instr) return;
  instr.querySelectorAll(`.${cls}`).forEach((el) => {
    el.classList.add("red");
    setTimeout(() => el.classList.remove("red"), 100);
  });
}

document.addEventListener("keydown", (e) => highlightInstructionKey(e.key));

// phone nav
let carouselcont = document.querySelector(".mobilenav ul");
let carouselitems = Array.from(carouselcont.children);
let carousellength = carouselitems.length;
let carouselIndex = 0;
function updateCarousel(direction) {
  if (direction === "next") {
    carouselcont.style.transform = `translateX(-${++carouselIndex * 100}%)`;
  } else if (direction === "prev") {
    carouselcont.style.transform = `translateX(-${--carouselIndex * 100}%)`;
  }
  if (carouselIndex === 0) {
    carleftarrow.style.opacity = "0.4";
  } else {
    carleftarrow.style.opacity = "1";
  }
  if (carouselIndex === carousellength - 1) {
    carrightarrow.style.opacity = "0.4";
  } else {
    carrightarrow.style.opacity = "1";
  }
}

carleftarrow = document.querySelector(".mobilenav .carleftarr");
carleftarrow.style.opacity = "0.4";
carrightarrow = document.querySelector(".mobilenav .carrightarr");
carleftarrow.addEventListener("click", () => {
  if (carouselIndex > 0) {
    updateCarousel("prev");
    updateTerminal(items[carouselIndex].id);
  }
});
carrightarrow.addEventListener("click", () => {
  if (carouselIndex < carousellength - 1) {
    updateCarousel("next");
    updateTerminal(items[carouselIndex].id);
  }
});

function main() {
  updateTerminal("about_me");
}

main();
