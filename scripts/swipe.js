function enableSwipe(areaSelector, leftArrowSelector, rightArrowSelector) {
  let startX = 0;
  let endX = 0;

  document.addEventListener("touchstart", (e) => {
    if (e.target.closest(areaSelector)) {
      startX = e.touches[0].clientX;
    }
  });

  document.addEventListener("touchend", (e) => {
    if (e.target.closest(areaSelector)) {
      endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          document.querySelector(leftArrowSelector)?.click();
          // console.log("swipe left");
        } else {
          document.querySelector(rightArrowSelector)?.click();
          // console.log("swipe right");
        }
      }
    }
  });
}

enableSwipe("ul.carousel", ".carleftarr", ".carrightarr");
enableSwipe(".projectimage img", ".mobileprojectarrows .leftarr", ".mobileprojectarrows .rightarr");