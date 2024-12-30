document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    const discountMessage = document.querySelector('.discount-message');

    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const code = document.getElementById('discountCode').value;
        
        try {
            const response = await fetch('newsletter.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: code })
            });

            const data = await response.json();
            if (data.success) {
                discountMessage.textContent = 'Kod je uspješno primijenjen!';
                discountMessage.style.color = '#27ae60';
                localStorage.setItem('newsletterDiscount', data.discount);
                renderCart();
            } else {
                discountMessage.textContent = 'Nevažeći kod za popust.';
                discountMessage.style.color = '#e74c3c';
            }
        } catch (error) {
            discountMessage.textContent = 'Došlo je do greške. Pokušajte ponovo.';
            discountMessage.style.color = '#e74c3c';
        }
    });
    const cartContainer = document.querySelector('.cart-container');
    const checkoutBtn = document.querySelector('.checkout-btn');

    async function checkNewsletterDiscount() {
        try {
            const email = localStorage.getItem('userEmail');
            if (!email) return null;

            const response = await fetch('newsletter.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });

            const data = await response.json();
            if (data.discount) {
                localStorage.setItem('newsletterDiscount', data.discount);
                return data.discount;
            }
            return null;
        } catch (error) {
            console.error('Error checking newsletter discount:', error);
            return null;
        }
    }

    async function renderCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const discountCode = await checkNewsletterDiscount();
        let cartHTML = '';
        let subtotal = 0;
        let discount = 0;

        if (cartItems.length === 0) {
            cartHTML = '<div class="empty-cart"><p>Vaš ceger je prazan</p></div>';
        } else {
            cartItems.forEach(item => {
                const itemTotal = item.price * (item.quantity || 1);
                subtotal += itemTotal;
                cartHTML += `
                    <div class="selected-product" data-id="${item.id}">
                        <button class="remove-item" aria-label="Ukloni proizvod">
                            <i class="fas fa-times"></i>
                        </button>
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

        if (discountCode) {
            discount = subtotal * 0.1; // 10% popust
        }

        const total = subtotal - discount;

        cartContainer.innerHTML = `
            <div class="cart-items">
                ${cartHTML}
            </div>
            <div class="checkout-section">
                <div class="subtotal">
                    <span>Međuzbroj:</span>
                    <span class="subtotal-price">${subtotal.toFixed(2)} BAM</span>
                </div>
                ${discountCode ? `
                <div class="discount">
                    <span>Newsletter popust (10%):</span>
                    <span class="discount-amount">-${discount.toFixed(2)} BAM</span>
                </div>
                ` : ''}
                <div class="total">
                    <span>Ukupno:</span>
                    <span class="total-price">${total.toFixed(2)} BAM</span>
                </div>
                <button class="checkout-btn" ${cartItems.length === 0 ? 'disabled' : ''}>
                    Nastavi na narudžbu
                </button>
            </div>
        `;

        addQuantityListeners();
        addRemoveListeners();
        addCheckoutListener();
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
        const updatedCart = cartItems.filter(item => item.id !== productId);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        renderCart();
        updateCartCount();
    }

    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    function addQuantityListeners() {
        document.querySelectorAll('.quantity-selector').forEach(selector => {
            const product = selector.closest('.selected-product');
            const productId = product.dataset.id;
            const input = selector.querySelector('input');
            const minusBtn = selector.querySelector('.minus');
            const plusBtn = selector.querySelector('.plus');

            input.addEventListener('change', () => {
                updateQuantity(productId, parseInt(input.value));
            });

            minusBtn.addEventListener('click', () => {
                updateQuantity(productId, parseInt(input.value) - 1);
            });

            plusBtn.addEventListener('click', () => {
                updateQuantity(productId, parseInt(input.value) + 1);
            });
        });
    }

    function addRemoveListeners() {
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const product = button.closest('.selected-product');
                const productId = product.dataset.id;
                removeItem(productId);
            });
        });
    }

    function addCheckoutListener() {
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                if (cartItems.length > 0) {
                    window.location.href = 'narudzba.html';
                } else {
                    alert('Vaš ceger je prazan!');
                }
            });
        }
    }

    // Inicijalno renderiranje košarice
    renderCart();
    updateCartCount();
});
