let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

function addToCart(productName) {
  cart.push(productName);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added.");
  updateCart();
}


function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartBadge = document.getElementById('cart-badge');
    const cartItems = document.getElementById('cart-items');

    cartCount.textContent = cart.length;
    cartBadge.textContent = cart.length;

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Your cart is empty';
        li.style.fontStyle = 'italic';
        li.style.color = '#999';
        cartItems.appendChild(li);
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;
            cartItems.appendChild(li);
        });
    }
}

function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  updateCart();
  alert("Cart cleared.");
}

function processOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order.');
    clearCart();
    closeModal();
}

function openModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            addToCart(productName);
        });
    });

    const viewCartButton = document.getElementById('view-cart-btn');
    viewCartButton.addEventListener('click', openModal);

    const clearCartButton = document.getElementById('clear-cart-btn');
    clearCartButton.addEventListener('click', clearCart);

    const processOrderButton = document.getElementById('process-order-btn');
    processOrderButton.addEventListener('click', processOrder);

    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', function(event) {
        const modal = document.getElementById('cart-modal');
        if (event.target === modal) {
            closeModal();
        }
    });

    updateCart();
});
