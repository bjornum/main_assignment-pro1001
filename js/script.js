const container = document.querySelector(".popular-produce-card-container");
const scrollLeftButton = document.getElementById("scroll-left");
const scrollRightButton = document.getElementById("scroll-right");

// Track the current card index
let currentIndex = 0;

// Updates the carousel position
const updateCarousel = () => {
  const cardWidth = container.querySelector(
    ".popular-produce-card"
  ).offsetWidth; // Get the exact width of one card
  container.scrollTo({
    left: currentIndex * cardWidth,
    behavior: "smooth",
  });
};

// Event listeners for the scroll buttons
scrollLeftButton.addEventListener("click", () => {
  const totalCards = container.querySelectorAll(".popular-produce-card").length; // Total number of cards
  currentIndex = (currentIndex - 1 + totalCards) % totalCards; // Move to the previous card
  updateCarousel();
});

scrollRightButton.addEventListener("click", () => {
  const totalCards = container.querySelectorAll(".popular-produce-card").length; // Total number of cards
  currentIndex = (currentIndex + 1) % totalCards; // Move to the next card
  updateCarousel();
});

// Ensure the carousel works only on mobile
if (window.innerWidth < 1024) {
  updateCarousel(); // Initialize the carousel position
}
