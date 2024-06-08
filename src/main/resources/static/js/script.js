let cart = [];
let totalAmount = 0;

function addToCart(productName, productPrice) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
        cart[productIndex].quantity -= 1;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
    }
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    totalAmount = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name} (x${item.quantity}) - $${item.price * item.quantity}</span>
            <button onclick="removeFromCart('${item.name}')">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalAmount += item.price * item.quantity;
    });
    document.getElementById('total-amount').innerText = totalAmount;
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('carrito').style.display = cart.length > 0 ? 'block' : 'none';
}

function checkout() {
    alert(`Total a pagar: $${totalAmount}`);
    cart = [];
    updateCart();
}

function login() {
    const username = prompt('Ingrese su nombre de usuario:');
    if (username) {
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'block';
        alert(`Bienvenido, ${username}!`);
    }
}

function logout() {
    document.getElementById('login-btn').style.display = 'block';
    document.getElementById('logout-btn').style.display = 'none';
    alert('Sesión cerrada.');
}

document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('logout-btn').addEventListener('click', logout);
