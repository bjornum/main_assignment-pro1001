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
  let cart = getCart();
  const existingProduct = cart.find((item) => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: productName, quantity: 1 });
  }
  saveCart(cart);
  updateCartCount();
  displayCartItems(); // refresh UI
};

// Get Cart
const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// Save Cart
const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Get amount of items in total from all products
const getTotalItems = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Remove from Cart
const removeFromCart = (productName) => {
  let cart = getCart();
  cart = cart.filter((item) => item.name !== productName);
  saveCart(cart);
  updateCartCount();
  displayCartItems(); // refresh UI
};

// Update Cart
const updateCart = (productName, quantity) => {
  let cart = getCart();
  const existingProduct = cart.find((item) => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity = quantity;
    if (quantity <= 0) {
      cart = cart.filter((item) => item.name !== productName);
    }
  }
  saveCart(cart);
  updateCartCount();
  displayCartItems(); // refresh UI
};

// Update Cart Count with the number of items in the cart
const updateCartCount = () => {
  const cartCountElement = document.getElementById("cart-count");
  const totalItems = getTotalItems();
  if (cartCountElement) {
    cartCountElement.textContent = totalItems > 0 ? totalItems : "";
  }
};

// ===== UI Display =====

const prices = {
  Oats: 8,
  "Red Onions": 4.5,
  Garlic: 3,
  Potatoes: 2.5,
  Carrots: 6.25,
};

const displayCartItems = () => {
  const container = document.getElementById("productContainer");
  if (!container) return;

  container.innerHTML = "";
  const cart = getCart();

  cart
    .filter((item) => item.quantity > 0)
    .forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";

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

// ===== Checkout (example) =====

const checkout = () => {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "/pages/checkout.html";
};

// ===== Init =====

updateCartCount();
displayCartItems();
