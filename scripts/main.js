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
let noisecont = document.querySelector(".noisecont")
function changeNoise(color){
  noisecont.style.setProperty("--noise-url", `url(/assets/images/${color}.png)`)
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
    filename.innerText = items[itemIndex].id + "/";
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
});

//function to handle clicking in nav
document.querySelector("ul").addEventListener("click", (event) => {
  if (event.target.tagName == "LI") {
    items[itemIndex].classList.toggle("active");
    itemIndex = items.indexOf(event.target);
    items[itemIndex].classList.toggle("active");
    updateFooter(items[itemIndex]);
  }
});
function updateTerminal() {}




