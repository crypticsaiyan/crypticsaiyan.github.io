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
