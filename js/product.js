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
    
    // Funkcionalnost za mobilni meni
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }
    
    // Inicijalno postavljanje
    showImage(currentIndex);
    startAutoRotate();
    
    // Resetiranje prikaza pri promjeni veličine prozora
    window.addEventListener('resize', () => {
        showImage(currentIndex);
        stopAutoRotate();
        startAutoRotate();
    });
});
// Modal functionality
    const cartModal = document.getElementById('cartModal');
    const closeModal = document.getElementById('closeModal');
    const addToCartButton = document.querySelector('.add-to-cart');
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    const viewCartBtn = document.querySelector('.view-cart');
    const checkoutBtn = document.querySelector('.checkout');

    function showModal() {
        cartModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    addToCartButton.addEventListener('click', showModal);
    
    closeModal.addEventListener('click', hideModal);
    
    continueShoppingBtn.addEventListener('click', hideModal);
    
    viewCartBtn.addEventListener('click', () => {
        window.location.href = '../kosarica.html';
    });
    
    checkoutBtn.addEventListener('click', () => {
        window.location.href = '../naplata.html';
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            hideModal();
        }
    });
// Cart counter functionality
const cartCount = document.querySelector('.cart-count');
let currentCount = parseInt(localStorage.getItem('cartCount')) || 0;

function updateCartCount() {
    if (currentCount === 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.textContent = currentCount;
        cartCount.style.display = 'flex';
    }
    localStorage.setItem('cartCount', currentCount);
}

// Inicijalni prikaz
updateCartCount();

// Kada se doda u košaricu
addToCartButton.addEventListener('click', () => {
    currentCount++;
    updateCartCount();
});
// Funkcionalnost za like dugme
if (likeButton) {
    likeButton.addEventListener('click', function() {
        this.classList.toggle('liked');
        const icon = this.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
    });
}
// Na početku product.js
// Animate intensity bars when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const intensityBars = document.querySelectorAll('.intensity-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.5
    });

    intensityBars.forEach(bar => {
        observer.observe(bar);
    });
});
