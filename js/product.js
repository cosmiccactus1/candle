document.addEventListener('DOMContentLoaded', function() {
    // Like/Favorite Button Functionality
    const likeButton = document.querySelector('.like-button');
    const heartIcon = likeButton?.querySelector('i');
    const favoriteCountElement = document.getElementById('favorite-count');

    // Cart Button Functionality
    const addToCartButton = document.querySelector('.add-to-cart');
    const cartCountElement = document.querySelector('.cart-count');
    const cartModal = document.querySelector('.cart-modal');
    const closeModalButton = document.querySelector('.close-modal');
    const continueShoppingButton = document.querySelector('.continue-shopping');
    const viewCartButton = document.querySelector('.view-cart');

    // Product Details
    const productId = 'brijuni-candle'; // Replace with actual product ID
    const productName = 'Brijuni Luxury Candle';
    const productPrice = 89.99;

    // Favorites Functionality
    function initializeFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        function updateFavoriteStatus() {
            const isFavorite = favorites.includes(productId);
            
            if (heartIcon) {
                heartIcon.classList.toggle('far', !isFavorite);
                heartIcon.classList.toggle('fas', isFavorite);
                likeButton.classList.toggle('liked', isFavorite);
            }
        }

        function updateFavoriteCount() {
            if (favoriteCountElement) {
                favoriteCountElement.textContent = favorites.length;
                favoriteCountElement.style.display = favorites.length > 0 ? 'inline' : 'none';
            }
        }

        function toggleFavorite() {
            if (favorites.includes(productId)) {
                favorites = favorites.filter(id => id !== productId);
            } else {
                favorites.push(productId);
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoriteStatus();
            updateFavoriteCount();
        }

        // Initial setup
        updateFavoriteStatus();
        updateFavoriteCount();

        // Add click event listener
        if (likeButton) {
            likeButton.addEventListener('click', toggleFavorite);
        }
    }

    // Cart Functionality
    function initializeCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function updateCartCount() {
            if (cartCountElement) {
                cartCountElement.textContent = cart.length;
                cartCountElement.style.display = cart.length > 0 ? 'inline' : 'none';
            }
        }

        function addToCart() {
            const existingProduct = cart.find(item => item.id === productId);
            
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            openCartModal();
        }

        function openCartModal() {
            if (cartModal) {
                cartModal.style.display = 'flex';
            }
        }

        function closeCartModal() {
            if (cartModal) {
                cartModal.style.display = 'none';
            }
        }

        // Initial cart count setup
        updateCartCount();

        // Event Listeners
        if (addToCartButton) {
            addToCartButton.addEventListener('click', addToCart);
        }

        if (closeModalButton) {
            closeModalButton.addEventListener('click', closeCartModal);
        }

        if (continueShoppingButton) {
            continueShoppingButton.addEventListener('click', closeCartModal);
        }

        if (viewCartButton) {
            viewCartButton.addEventListener('click', function() {
                // Redirect to cart page or open cart view
                window.location.href = '/cart'; // Replace with actual cart page URL
            });
        }
    }

    // Initialize both functionalities
    initializeFavorites();
    initializeCart();
});
