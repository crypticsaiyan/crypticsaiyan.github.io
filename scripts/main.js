// function to make the hey text blink
let frame = document.createElement("img");
frame.src = "assets/images/frame1.png";

let hey = document.querySelector(".hey");
hey.append(frame);
function blinkHey() {
  setInterval(() => {
    if (frame.src.endsWith("frame1.png"))
      frame.src = "assets/images/frame2.png";
    else frame.src = "assets/images/frame1.png";
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
  const colorMap = {
    r: "yellow",
    w: "red",
    x: "green",
    d: "orange",
  };

  permissions.innerHTML = x.replace(
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
  skills: ["displaysills", ""],
  "hobbies/" : ["ls", "hobbies"],
  "projects/" : ["", ""],
  "get_in_touch": ["eza", ""],
  credits: ["cowsaycredits", ""]
};

// function to update terminal
let terminal = document.querySelector(".terminal");
function updateTerminal(id) {
  terminal.firstElementChild.innerHTML = `
              <div class="text">
              <span class="bold red">╭─cryptosaiyan</span>
              <span class="rosewater">in</span>
              <span class="bold pink">/${id}</span><br />
              <span class="bold"
                ><span class="red">╰─λ</span
                ><span class="blue"> ${mappings[id][0]}</span></span
              >
              <span class="rosewater">${mappings[id][1]}</span>
            </div>
  `;
  if (id == "about_me") {
    terminal.lastElementChild.innerHTML = `
                Hi! I'm an undergraduate student in Computer Science at IIT Dhanbad.
            I'm passionate about cybersecurity, web development, and exploring
            the deeper layers of computer science. When I'm not coding or diving
            into tech, you'll probably find me reading a good book or immersed
            in a great game. Oh, and yes — I use
            <i class="nf nf-md-arch"></i> btw.
    `;
  } else if (id == "skills") {
    terminal.lastElementChild.innerHTML = `
                <div class="skills">
              <div class="bold white">Languages:</div>
              <div class="lang">
                <div class="orange">
                  <i class="nf nf-dev-html5"></i><span>HTML</span>
                </div>
                <div class="blue">
                  <i class="nf nf-dev-css3"></i><span>CSS</span>
                </div>
                <div class="yellow">
                  <i class="nf nf-fa-js"></i><span>JavaScript</span>
                </div>
                <div class="blue"><i class="nf nf-custom-c"></i><span>C</span></div>
                <div class="sapphire">
                  <i class="nf nf-custom-cpp"></i><span>C++</span>
                </div>
                <div class="green">
                  <i class="nf nf-dev-python"></i><span>Python</span>
                </div>
              </div>
              <div class="bold white">Tools:</div>
              <div class="tools">
                <div class="black">
                  <i class="nf nf-dev-linux"></i><span>Linux</span>
                </div>
                <div class="red">
                  <i class="nf nf-dev-git"></i><span>Git</span>
                </div>
                <div class="mauve">
                  <i class="nf nf-cod-github"></i><span>GitHub</span>
                </div>
                <div class="green">
                  <i class="nf nf-custom-neovim"></i><span>Neovim</span>
                </div>
                <div class="white">
                  <i class="nf nf-md-arch"></i><span>Arch Linux</span>
                </div>
              </div>
            </div>
    `;
  }
}
