const placeholders = [
  'Search "Chips"',
  'Search "atta dal and more"',
  'Search "vegetables"',
  'Search "fruits & snacks"',
  'Search "cold drinks"',
  'Search "namkeen"',
  'Search "breakfast items"',
  'Search "ice cream"',
];
let currentIndex = 0;
const placeholderElement = document.getElementById("animatedPlaceholder");
const searchInput = document.getElementById("searchInput");
const placeholderContainer = document.getElementById("placeholderContainer");

function changePlaceholder() {
  placeholderElement.style.animation = "none";

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % placeholders.length;
    placeholderElement.textContent = placeholders[currentIndex];
    placeholderElement.style.animation = "fadeInOut 3s ease-in-out";
  }, 50);
}
setInterval(changePlaceholder, 2000);

searchInput.addEventListener("input", function () {
  if (this.value.length > 0) {
    placeholderContainer.style.display = "none";
  } else {
    placeholderContainer.style.display = "block";
  }
});

searchInput.addEventListener("focus", function () {
  if (this.value.length > 0) {
    placeholderContainer.style.display = "none";
  }
});

searchInput.addEventListener("blur", function () {
  if (this.value.length === 0) {
    placeholderContainer.style.display = "block";
  }
});

// location page

function openLocationModal() {
  document.getElementById("locationModalOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLocationModal() {
  document.getElementById("locationModalOverlay").classList.remove("active");
  document.body.style.overflow = "auto";
}

// login page
function openModal() {
  document.getElementById("modalOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  document.body.style.overflow = "auto";
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
    closeLocationModal();
  }
});

// Cart Button
let cartItemCount = Number(localStorage.getItem("bagItems")) || 0;
const cartBtn = document.getElementById("cart-btn");

updateCartText();

function updateCartText() {
  const cartIcon = '<i class="fa-solid fa-cart-shopping"></i>';

  if (cartItemCount === 0) {
    cartBtn.innerHTML = cartIcon + "Cart";
  } else {
    cartBtn.innerHTML = cartIcon + "  " + cartItemCount + "items";
  }
}

function addToBag() {
  cartItemCount++;
  localStorage.setItem("bagItems", cartItemCount);
  updateCartText();
}

// Cart Page

let cart = [];
if(localStorage.getItem('blinkitCart')){
  cart=JSON.parse(localStorage.getItem('blinkitCart'));
}
function addToCart(productName, productPrice, productImage, productSize) {
  const existingItem = cart.find((item) => item.name === productName);
  if (existingItem) {
    existingItem.quantity+=1;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      image: productImage,
      size: productSize,
      quantity: 1,
    });
  }

  updateCart();
  localStorage.setItem('blinkitCart',JSON.stringify(cart));
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  const itemCount = document.getElementById("itemCount");
   const cartFooter = document.querySelector(".cart-footer");
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
   cartItemsContainer.innerHTML = `
    <div class="empty-bag-container empty-cart">
    <img src="https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA=">
    <p class="empty-bag">Oops, Your cart is empty</p>
    <a href="index.html" class="continue-shopping-btn">Back to Shopping</a>
    </div>
    `;
    cartFooter.style.display="none";
    updateCartButton();
    return;
  }

  cartFooter.style.display="block";
  let totalItems = 0;
let totalPrice=0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
    totalItems += item.quantity;

    cartItemsContainer.innerHTML += `
    <div class="cart-item">
    <img src="${item.image}">
     <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.size}</p>
                </div>
                 <div class="cart-item-price">
                    <b>₹${itemTotal}</b>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>
            </div>
    `;
  });

   itemCount.textContent = totalItems;
   document.getElementById('itemsTotal').textContent = totalPrice;
   const grandTotal = totalPrice + 25 + 2 + 3; // Adding charges
   document.getElementById('grandTotal').textContent = grandTotal;
   document.getElementById('checkoutTotal').textContent = grandTotal;
     
    updateCartButton();
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCart();
    localStorage.setItem('blinkitCart', JSON.stringify(cart));
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1); 
    }
    updateCart();
    localStorage.setItem('blinkitCart', JSON.stringify(cart));
}

function openCart() {
    document.getElementById('cartModal').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow='hidden';
}

// Close Cart
function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Update Cart Count on Button
function updateCartButton() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBtn = document.getElementById('cart-btn');
    if (totalItems === 0) {
       cartBtn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i><span>My Cart</span>';
    } else {
       cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i><span>My Cart (${totalItems})</span>`;
         }}

document.addEventListener('keydown',function(e){
  if(e.key=='Escape'){
    closeCart();
  }
});
updateCart();



// Cart button click
document.getElementById('cart-btn').addEventListener('click', openCart);


// add from product car
function addToCartFromProduct(button) {
    const productCard = button.closest('.productItems');
    const name = productCard.querySelector('.product-name').textContent;
    const price = parseInt(productCard.querySelector('.product-price').textContent.replace('₹', ''));
    const size = productCard.querySelector('.product-size').textContent;
    const image = productCard.querySelector('.product-image').src;
    
    addToCart(name, price, image, size);
}






