document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const images = document.querySelectorAll('.product-image');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const likeButtons = document.querySelectorAll('.like-button');
    const cartCount = document.querySelector('.cart-count');
    const cartContainer = document.querySelector('.cart-container');
    const addToCartButton = document.querySelector('.add-to-cart');
    const cartModal = document.querySelector('.cart-modal');
    const closeModal = document.querySelector('.close-modal');
    const continueShopping = document.querySelector('.continue-shopping');
    const viewCart = document.querySelector('.view-cart');
    const favoriteCountElement = document.getElementById('favorite-count');
    const dots = document.querySelectorAll('.dot');

    // Provjera lokacije
    const isProductPage = window.location.pathname.includes('products/');

    // Funkcije za košaricu
    function renderCart() {
        if (!cartContainer) return;

        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let cartHTML = '';
        let total = 0;

        if (cartItems.length === 0) {
            cartHTML = '<div class="empty-cart"><p>Vaš ceger je prazan</p></div>';
        } else {
            cartHTML += '<div class="cart-items">';
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
            cartHTML += '</div>';
            cartHTML += `
                <div class="checkout-section">
                    <div class="total">
                        <span>Ukupno:</span>
                        <span class="total-price">${total} BAM</span>
                    </div>
                    <button class="checkout-btn">Nastavite na plaćanje</button>
                </div>
            `;
        }

        cartContainer.innerHTML = cartHTML;
        addEventListeners();
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

    function addToCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const productId = 'brijuni-svijeca';
        const product = products[productId];
        
        if (product) {
            cartItems.push({
                ...product,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
            
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
            showCartModal();
        }
    }

    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartCount) {
            cartCount.textContent = cartItems.length;
            cartCount.style.display = cartItems.length > 0 ? 'flex' : 'none';
        }
    }

    // Funkcije za favorite
    function updateFavoriteCount() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favoriteCountElement) {
            favoriteCountElement.textContent = favorites.length;
            favoriteCountElement.style.display = favorites.length > 0 ? 'flex' : 'none';
        }
    }

    function toggleFavorite(productId) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const product = products[productId];
        
        if (!product) return;

        const existingIndex = favorites.findIndex(item => item.id === productId);
        
        if (existingIndex === -1) {
            favorites.push({
                ...product,
                addedAt: new Date().toISOString()
            });
        } else {
            favorites.splice(existingIndex, 1);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteStatus();
        updateFavoriteCount();
    }

    function updateFavoriteStatus() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        document.querySelectorAll('.like-button').forEach(button => {
            const productId = button.dataset.productId;
            if (!productId) return;
            
            const heartIcon = button.querySelector('i');
            if (favorites.find(item => item.id === productId)) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                button.classList.add('liked');
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                button.classList.remove('liked');
            }
        });
    }

    // Event listeneri
    function addEventListeners() {
        // Quantity buttons
        document.querySelectorAll('.quantity-selector').forEach(selector => {
            const product = selector.closest('.selected-product');
            const productId = product.dataset.id;
            const input = selector.querySelector('input');
            const minusBtn = selector.querySelector('.minus');
            const
