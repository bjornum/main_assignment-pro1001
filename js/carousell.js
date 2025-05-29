const container = document.querySelector(".popular-produce-card-container");
const scrollLeftButton = document.getElementById("scroll-left");
const scrollRightButton = document.getElementById("scroll-right");

// Track the current card index
let currentIndex = 0;

// Updates the carousel position
const updateCarousel = () => {
  // Get the exact width of one card
  const cardWidth = container.querySelector(".popular-produce-card").offsetWidth;
  container.scrollTo({
    left: currentIndex * cardWidth,
    behavior: "smooth",
  });
};

/* "Scrolls" to the previous card */
scrollLeftButton.addEventListener("click", () => {
  // Total number of cards
  const totalCards = container.querySelectorAll(".popular-produce-card").length;
  // Move to the previous card
  currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  updateCarousel();
});

/* "scrolls" to the right card */
scrollRightButton.addEventListener("click", () => {
  // Total number of cards
  const totalCards = container.querySelectorAll(".popular-produce-card").length;
  // Move to the next card
  currentIndex = (currentIndex + 1) % totalCards;
  updateCarousel();
});

// Ensure the carousel works only on mobile and initializes correctly
if (window.innerWidth < 1024) {
  updateCarousel();
}
