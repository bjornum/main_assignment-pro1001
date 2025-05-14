/* ===== 
  Anything Product Handling
  - Add to Cart
- Remove from Cart
- Update Cart
- Checkout
- Display number of item
===== */

// Add to Cart
const addToCart = (productName) => {
  // Store in local storage where user click an product, it add to the cart and if it already exist, it will increase the quantity
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: productName, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};

// Get Cart
const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// Get amount of items in total from all products
const getTotalItems = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Remove from Cart
const removeFromCart = (productName) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.name !== productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};

// Update Cart
const updateCart = (productName, quantity) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity = quantity;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};

// Update Cart Count with the number of items in the cart
const updateCartCount = () => {
  const cartCountElement = document.getElementById("cart-count");
  const totalItems = getTotalItems();
  cartCountElement.textContent = totalItems > 0 ? totalItems : "";
};

updateCartCount();

// Checkout
const checkout = () => {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  // Proceed to checkout logic here
  alert("Proceeding to checkout...");
};
