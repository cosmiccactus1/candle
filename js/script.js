document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM je učitan!");

    // DOM elementi
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const images = document.querySelectorAll('.product-image');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const likeButtons = document.querySelectorAll('.like-button');
    const cartCount = document.querySelector('.cart-count');
    const addToCartButton = document.querySelector('.add-to-cart');
    const cartModal = document.querySelector('.cart-modal');
    const closeModal = document.querySelector('.close-modal');
    const continueShopping = document.querySelector('.continue-shopping');
    const viewCart = document.querySelector('.view-cart');
    const checkout = document.querySelector('.checkout');
    const favoriteCountElement = document.getElementById('favorite-count');
    const dots = document.querySelectorAll('.dot');
    
    // Definicija proizvoda - usklađena s HTML-om
    const products = {
        'brijuni-svijeca': {
            id: 'brijuni-svijeca',
            name: 'B R I J U N I',
            price: '24,99',
            image: 'images/brijuni.jpg',
            description: 'Luksuzna aromatična svijeća',
            pageUrl: 'products/product1.html'
        },
        'nedjeljni-sabah': {
            id: 'nedjeljni-sabah',
            name: 'NEDJELJNI SABAH',
            price: '24,99',
            image: 'images/nedjeljnisabah.jpg',
            description: 'Aromatična svijeća',
            pageUrl: 'products/product2.html'
        },
        'planinska-koliba': {
            id: 'planinska-koliba',
            name: 'PLANINSKA KOLIBA',
            price: '16,99',
            image: 'images/planinskakoliba.jpg',
            description: 'Mirisna svijeća',
            pageUrl: 'products/planinskakoliba.html'
        },
        'zumbul': {
            id: 'zumbul',
            name: 'Z U M B U L',
            price: '55',
            image: 'images/zumbul.jpg',
            description: 'Aromatična svijeća',
            pageUrl: 'products/product4.html'
        },
        'volim-te': {
            id: 'volim-te',
            name: 'VOLIM TE',
            price: '16,99',
            image: 'images/volimte.jpg',
            description: 'LTD VALENTINES EDITION',
            pageUrl: 'products/volimte.html'
        }
    };

    // Funkcije za košaricu
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartCount) {
            cartCount.textContent = cartItems.length;
            cartCount.style.display = cartItems.length > 0 ? 'flex' : 'none';
        }
    }

    function showCartModal() {
        if (cartModal) {
            cartModal.style.display = 'flex';
        }
    }

    function hideCartModal() {
        if (cartModal) {
            cartModal.style.display = 'none';
        }
    }

    function addToCart(productId) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const product = products[productId];
        
        if (!product) {
            console.error('Proizvod nije pronađen:', productId);
            return;
        }
        
        cartItems.push({
            ...product,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        showCartModal();
    }

    // Funkcije za favorite
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

    function updateFavoriteCount() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favoriteCountElement) {
            favoriteCountElement.textContent = favorites.length;
            favoriteCountElement.style.display = favorites.length > 0 ? 'flex' : 'none';
        }
    }

    function toggleFavorite(productId) {
        console.log('Toggling favorite for:', productId);
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const product = products[productId];
        
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        const existingIndex = favorites.findIndex(item => item.id === productId);
        
        if (existingIndex === -1) {
            const productToAdd = {
                ...product,
                addedAt: new Date().toISOString()
            };
            favorites.push(productToAdd);
            console.log('Added to favorites');
        } else {
            favorites.splice(existingIndex, 1);
            console.log('Removed from favorites');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteStatus();
        updateFavoriteCount();
    }

    // Event listeneri
    if (addToCartButton) {
        const productId = addToCartButton.dataset.productId;
        addToCartButton.addEventListener('click', () => addToCart(productId));
    }

    if (closeModal) {
        closeModal.addEventListener('click', hideCartModal);
    }

    if (continueShopping) {
        continueShopping.addEventListener('click', hideCartModal);
    }

    if (viewCart) {
        viewCart.addEventListener('click', () => {
            window.location.href = 'kosarica.html';
        });
    }

    if (checkout) {
        checkout.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }

    // Event listeneri za sve like buttone
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productId = button.dataset.productId;
            console.log('Like button clicked for:', productId);
            toggleFavorite(productId);
        });
    });

    // Mobilni meni
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                navLinks.classList.contains('active'));
        });
    }

    // Inicijalizacija
    updateCartCount();
    updateFavoriteStatus();
    updateFavoriteCount();
});
