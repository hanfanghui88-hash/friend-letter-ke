const story = document.querySelector("#story");
const slides = Array.from(document.querySelectorAll(".slide"));
const dots = document.querySelector(".dots");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const restartBtn = document.querySelector("#restartBtn");

let current = 0;
let touchStartX = 0;
let touchStartY = 0;

slides.forEach((slide, index) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.setAttribute("role", "tab");
  dot.setAttribute("aria-label", `第 ${index + 1} 页`);
  dot.addEventListener("click", () => showSlide(index));
  dots.appendChild(dot);
  slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");
});

const dotButtons = Array.from(document.querySelectorAll(".dot"));

function showSlide(index) {
  const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
  current = nextIndex;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === current;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  dotButtons.forEach((dot, dotIndex) => {
    dot.setAttribute("aria-current", String(dotIndex === current));
  });

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === slides.length - 1;
  restartBtn.classList.toggle("is-visible", current === slides.length - 1);
}

function goNext() {
  if (current < slides.length - 1) {
    showSlide(current + 1);
  }
}

function goPrev() {
  if (current > 0) {
    showSlide(current - 1);
  }
}

prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);
restartBtn.addEventListener("click", () => showSlide(0));

story.addEventListener("click", (event) => {
  if (!event.target.closest("button, a, input, textarea, select")) {
    goNext();
  }
});

story.addEventListener("touchstart", (event) => {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

story.addEventListener("touchend", (event) => {
  const touch = event.changedTouches[0];
  const diffX = touch.clientX - touchStartX;
  const diffY = touch.clientY - touchStartY;
  if (Math.abs(diffX) > 56 && Math.abs(diffX) > Math.abs(diffY) * 1.35) {
    diffX < 0 ? goNext() : goPrev();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    goNext();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goPrev();
  }
});

showSlide(0);
