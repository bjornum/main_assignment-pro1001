/* ===== 
  Anything Product Handling

  Functions:
  - getCart()
  - addToCart(productName)
  - saveCart(cart)
  - getTotalItems()
  - removeFromCart(productName)
  - updateCart(productName, quantity)
  - updateCartCount()
  - displayCartItems()
  - showFeedbackMessage(message, action)
  - checkout()
  - updateCartCount()
  - displayCartItems()
  - checkout()
===== */

/* Prices of the various products
  - Note: Had to stringify Red Onions to avoid issues with the name
*/
const prices = {
  Oats: 16,
  "Red Onions": 22.5,
  Garlic: 38,
  Potatoes: 32,
  Carrots: 48,
};

/* Get Cart
  - Gets the cart from local storage
  - If it doesn't exist, return an empty array
*/
const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

/* Add to Cart
  - Gets the cart from local storage
  - Checks if the product already exists in the cart
  - If it does, increase the quantity
  - If it doesn't, add the product to the cart with quantity 1
  - Saves the cart to local storage
  - Updates the cart count
  - Displays the cart items
  - Shows feedback message
*/
const addToCart = (productName) => {
  let cart = getCart();
  const existingProduct = cart.find((item) => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: productName, quantity: 1 });
  }
  saveCart(cart);
  updateCartCount();
  displayCartItems();

  // Show feedback message
  showFeedbackMessage(`Added ${productName} to the basket`, "add");
};

/* Save Cart
  - Saves the cart to local storage
  - Converts the cart to a string using JSON.stringify
*/
const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

/* Get amount of items in total from all products
  - Gets the cart from local storage
  - Reduces the cart to get the total quantity of items
  - Returns the total quantity
*/
const getTotalItems = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

/* Update Cart
  - Updates the quantity of a product in the cart
  - If the quantity is less than or equal to 0, remove the product from the cart
  - If the quantity is greater than the previous quantity, show an "added" message
  - If the quantity is less than the previous quantity, show a "removed" message
  - Saves the cart to local storage
  - Updates the cart count
  - Displays the cart items
*/
const updateCart = (productName, quantity) => {
  let cart = getCart();
  const existingProduct = cart.find((item) => item.name === productName);

  if (existingProduct) {
    // Store the previous quantity for comparison
    const previousQuantity = existingProduct.quantity;
    existingProduct.quantity = quantity;

    if (quantity <= 0) {
      cart = cart.filter((item) => item.name !== productName);
      showFeedbackMessage(`Removed ${productName} from the basket`, "remove");
    } else if (quantity > previousQuantity) {
      showFeedbackMessage(`Added +1 to ${productName}`, "add");
    } else if (quantity < previousQuantity) {
      showFeedbackMessage(`Removed -1 from ${productName}`, "remove");
    }
  }

  saveCart(cart);
  updateCartCount();
  displayCartItems();
};

/* Update Cart Count with the number of items in the cart
  - Gets the total number of items in the cart
  - Updates the cart count element in the UI
*/
const updateCartCount = () => {
  const cartCountElement = document.getElementById("cart-count");
  const totalItems = getTotalItems();
  if (cartCountElement) {
    cartCountElement.textContent = totalItems > 0 ? totalItems : "0";
  }
};

/* Removes a product from the cart
  - Gets the cart from local storage
  - Filters the cart to remove the product
  - Saves the cart to local storage
  - Updates the cart count
  - Displays the cart items
*/
const removeFromCart = (productName) => {
  let cart = getCart();
  cart = cart.filter((item) => item.name !== productName);
  saveCart(cart);
  updateCartCount();
  displayCartItems();
};

// ===== UI Display =====

/* Displays the cart items in the UI
  - Filters the cart to only show items with quantity > 0
  - Creates a card for each product with its image, name, price, and quantity
  - Adds buttons to increase or decrease the quantity
  - Updates the cart count
  - Shows feedback message
*/
const displayCartItems = () => {
  const container = document.getElementById("productContainer");
  if (!container) return;

  container.innerHTML = "";
  const cart = getCart();

  cart
    .filter((item) => item.quantity > 0)
    .forEach((product) => {
      const card = document.createElement("div");
      card.className = "checkout-card";

      const pricePerItem = prices[product.name];
      const totalPrice = (pricePerItem * product.quantity).toFixed(2);

      card.innerHTML = `
        <img src="/assets/productPage/${product.name}.avif" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">${product.quantity} x ${pricePerItem} kr = ${totalPrice} kr</div>
        <div class="controls">
          <button onclick="updateCart('${product.name}', ${product.quantity - 1})">-</button>
          <span>${product.quantity}</span>
          <button onclick="updateCart('${product.name}', ${product.quantity + 1})">+</button>
        </div>
      `;

      container.appendChild(card);
    });
};

/* Creates a feedback message block
  - Sets the message text and styles
  - Appends the block to the body
  - Adjusts the position of all feedback blocks for stacking
  - Hides and removes the block after a specified duration
*/
const showFeedbackMessage = (message, action) => {
  console.log("Feedback message:", message); // Debugging line

  // Create a new feedback block
  const feedbackSection = document.createElement("div");
  feedbackSection.className = "feedback-block";

  // Set the message text
  feedbackSection.textContent = message;

  // Style the feedback block
  feedbackSection.style.position = "fixed";
  feedbackSection.style.top = "20px"; // Adjust dynamically for stacking
  feedbackSection.style.right = "20px";
  feedbackSection.style.color = "white";
  feedbackSection.style.padding = "10px 20px";
  feedbackSection.style.borderRadius = "5px";
  feedbackSection.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
  feedbackSection.style.zIndex = "1000";
  feedbackSection.style.marginBottom = "10px"; // Space between stacked messages

  // Set background color based on action
  if (action === "add") {
    feedbackSection.style.backgroundColor = "#4caf50"; // Green for adding
  } else if (action === "remove") {
    feedbackSection.style.backgroundColor = "#f44336"; // Red for removing
  } else {
    feedbackSection.style.backgroundColor = "#2196f3"; // Default (blue) for other actions
  }

  // Append the feedback block to the body
  document.body.appendChild(feedbackSection);

  // Adjust the position of all feedback blocks for stacking
  const feedbackBlocks = document.querySelectorAll(".feedback-block");
  feedbackBlocks.forEach((block, index) => {
    block.style.top = `${20 + index * 60}px`; // Stack messages with 60px spacing
  });

  // Hide and remove the feedback block after 5 seconds
  setTimeout(() => {
    feedbackSection.style.opacity = "0"; // Fade out effect
    setTimeout(() => {
      feedbackSection.remove(); // Remove from DOM
    }, 500);
  }, 2000);
};

// ===== Checkout (example) =====

const checkout = () => {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  // Work in progress: Implement checkout logic here
};

/* ===== Triggers on page load ===== */

updateCartCount();
displayCartItems();
