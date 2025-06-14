let startX = 0;
let endX = 0;

const swipeArea = document.querySelector("ul.carousel");

swipeArea.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

swipeArea.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = endX - startX;
  if (Math.abs(diff) > 50) {
    // Minimum swipe distance
    if (diff > 0) {
      document.querySelector('.carleftarr')?.click();
    } else {
      document.querySelector('.carrightarr')?.click();
    }
  }
}
