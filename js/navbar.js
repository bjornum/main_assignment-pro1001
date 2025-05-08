const hamburgerMenuButton = document.querySelector(".hamburger-menu-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const sideMenu = document.getElementById("side-menu");

// Open the side menu
hamburgerMenuButton.addEventListener("click", () => {
  sideMenu.classList.add("open");
});

// Close the side menu
closeMenuButton.addEventListener("click", () => {
  sideMenu.classList.remove("open");
});

// Close the menu when clicking outside of it (optional)
window.addEventListener("click", (e) => {
  if (e.target === sideMenu) {
    sideMenu.classList.remove("open");
  }
});
