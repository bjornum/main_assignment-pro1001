// Button to open side menu
const hamburgerMenuButton = document.querySelector(".hamburger-menu-button");
// Button to close side menu
const closeMenuButton = document.querySelector(".close-menu-button");
// The actual side menu container
const sideMenu = document.getElementById("side-menu");

// Open the side menu when the hamburger icon is clicked
hamburgerMenuButton.addEventListener("click", () => {
  // Adds a CSS class to show the menu
  sideMenu.classList.add("open");
});

// Close the side menu when the close icon is clicked
closeMenuButton.addEventListener("click", () => {
  // Removes the CSS class to hide the menu
  sideMenu.classList.remove("open");
});

// close menu if user clicks outside of it
window.addEventListener("click", (e) => {
  if (e.target === sideMenu) {
    // Clicking the background area will close the menu
    sideMenu.classList.remove("open");
  }
});
