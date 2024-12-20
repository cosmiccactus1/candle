// kosarica.js
document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.querySelector('.cart-container');
    const checkoutBtn = document.querySelector('.checkout-btn');

    function renderCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let cartHTML = '';
        let total = 0;

        if (cartItems.length === 0) {
            cartHTML = '<div class="empty-cart"><p>Vaš ceger je prazan</p></div>';
        } else {
            cartItems.forEach(item => {
                const itemTotal = item.price * (item.quantity || 1);
                total += itemTotal;
                cartHTML += `
                    <div class="selected-product" data-id="${item.id}">
                        <div class="remove-item">
                            <i class="fas fa-times"></i>
                        </div>
                        <img src="${item.image}" alt="${item.name}">
                        <div class="product-details">
                            <div>
                                <h2>${item.name}</h2>
                                <p class="price">${item.price} BAM</p>
                            </div>
                            <div class="quantity-selector">
                                <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                                <input type="number" value="${item.quantity || 1}" min="1">
                                <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        cartContainer.innerHTML = `
            <div class="cart-items">
                ${cartHTML}
            </div>
            <div class="checkout-section">
                <div class="total">
                    <span>Ukupno:</span>
                    <span class="total-price">${total} BAM</span>
                </div>
                <button class="checkout-btn" ${cartItems.length === 0 ? 'disabled' : ''}>
                    Nastavi na narudžbu
                </button>
            </div>
        `;

        // Dodaj event listenere za količinu i brisanje
        addQuantityListeners();
        addRemoveListeners();
    }

    function updateQuantity(productId, newQuantity) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = cartItems.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity = Math.max(1, newQuantity);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
            updateCartCount();
        }
    }

    function removeItem(productId) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const update
