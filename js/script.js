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
    
    // Provjera trenutne stranice
    const isProductPage = window.location.pathname.includes('products/');
    const imagePath = isProductPage ? '../images/' : 'images/';
    const redirectPath = isProductPage ? '../' : '';

    // Definicija proizvoda
    const products = {
        'brijuni-svijeca': {
            id: 'brijuni-svijeca',
            name: 'Brijuni svijeća',
            price: '35',
            image: `${imagePath}svijeća1.jpg`,
            description: 'Luksuzna aromatična svijeća'
        },
        'nedjeljni-sabah': {
            id: 'nedjeljni-sabah',
            name: 'Nedjeljni Sabah',
            price: '45',
            image: `${imagePath}svijeca2.jpg`,
            description: 'Aromatična svijeća'
        },
        'planinska-kuca': {
            id: 'planinska-kuca',
            name: 'Planinska Kuća',
            price: '50',
            image: `${imagePath}svijeca3.jpg`,
            description: 'Aromatična svijeća'
        },
        'zumbul': {
            id: 'zumbul',
            name: 'Zumbul',
            price: '55',
            image: `${imagePath}svijeca4.jpg`,
            description: 'Aromatična svijeća'
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

    function addToCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const currentProduct = products['brijuni-svijeca'];
        cartItems.push({
            ...currentProduct,
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
        likeButtons.forEach(button => {
            const productId = button.dataset.productId;
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
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const product = products[productId];
        
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        const existingIndex = favorites.findIndex(item => item.id === productId);
        
        if (existingIndex === -1) {
            favorites.push({
                ...product,
                addedAt: new Date().toISOString(),
                pageUrl: isProductPage ? `product${productId}.html` : `products/product${productId}.html`
            });
        } else {
            favorites.splice(existingIndex, 1);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteStatus();
        updateFavoriteCount();
    }

    // Event listeneri
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    }

    if (closeModal) {
        closeModal.addEventListener('click', hideCartModal);
    }

    if (continueShopping) {
        continueShopping.addEventListener('click', hideCartModal);
    }

    if (viewCart) {
        viewCart.addEventListener('click', () => {
            window.location.href = `${redirectPath}kosarica.html`;
        });
    }

    if (checkout) {
        checkout.addEventListener('click', () => {
            window.location.href = `${redirectPath}checkout.html`;
        });
    }

    // Event listener za favorite
    likeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productId = button.dataset.productId;
            toggleFavorite(productId);
        });
    });

    // Mobilni meni
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // Inicijalizacija
    updateCartCount();
    updateFavoriteStatus();
    updateFavoriteCount();
});
