const isPortrait = window.matchMedia("(orientation: portrait)").matches;
if (isPortrait) {
  document.querySelector(".cursor").style.display = "none";
}

document.addEventListener("mousemove", function (event) {
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    cursor.style.left = event.pageX - 20 + "px";
    cursor.style.top = event.pageY - 20 + "px";
  }
});

document.addEventListener("click", function () {
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    cursor.classList.add("click");
    setTimeout(() => {
      cursor.classList.remove("click");
    }, 200);
  }
});

// Add hover effect for dynamically created elements using event delegation
function addHoverEffect(selector, className) {
  document.addEventListener("mouseover", function (event) {
    if (event.target.matches(selector)) {
      const cursor = document.querySelector(".cursor");
      if (cursor) {
        cursor.classList.add(className);
      }
    }
  });
  document.addEventListener("mouseout", function (event) {
    if (event.target.matches(selector)) {
      const cursor = document.querySelector(".cursor");
      if (cursor) {
        cursor.classList.remove(className);
      }
    }
  });
}
// document.querySelectorAll('a').forEach(element => {
//     console.log(element);
// });
addHoverEffect("a", "hover-link");
addHoverEffect("a *", "hover-link");
addHoverEffect("li", "hover-list");
