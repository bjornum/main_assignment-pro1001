const form = document.querySelector(".newsletter-form");
const firstNameInput = document.getElementById("first-name");
const emailInput = document.getElementById("email");
const formContainer = document.getElementById("form-container");
const successMessage = document.getElementById("success-message");

const createErrorMessage = (input, message) => {
  let errorEl = input.nextElementSibling;
  if (!errorEl || !errorEl.classList.contains("input-error-message")) {
    errorEl = document.createElement("p");
    errorEl.className = "input-error-message";
    input.after(errorEl);
  }
  errorEl.textContent = message;
  errorEl.style.color = "red";
  errorEl.style.fontSize = "0.9rem";
  errorEl.style.marginTop = "4px";
};

const clearErrorMessages = () => {
  document.querySelectorAll(".input-error-message").forEach((el) => el.remove());
};

const handleNewsletterSignup = (e) => {
  e.preventDefault();
  clearErrorMessages();

  const name = firstNameInput.value.trim();
  const email = emailInput.value.trim();
  let valid = true;

  if (!name) {
    createErrorMessage(firstNameInput, "Please enter your first name.");
    valid = false;
  }

  if (!email) {
    createErrorMessage(emailInput, "Please enter your email address.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    createErrorMessage(emailInput, "Please enter a valid email address.");
    valid = false;
  }

  if (!valid) return;

  // Hide form, show success message
  formContainer.style.display = "none";
  successMessage.style.display = "block";
};

form.addEventListener("submit", handleNewsletterSignup);
