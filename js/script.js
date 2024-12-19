console.log("Script je učitan!");

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
    
    // Provjeriti na kojoj smo stranici
    const isProductPage = window.location.pathname.includes('products/');
    const imagePath = isProductPage ? '../images/' : 'images/';
    const redirectPath = isProductPage ? '../' : '';

    // Definicije proizvoda
    const products = {
        'brijuni-svijeca': {
            id: 'brijuni-svijeca',
            name: 'Brijuni svijeća',
            price: '35',
            image: `${imagePath}svijeća1.jpg`,
            description: 'Luksuzna aromatična svijeća',
            pageUrl: isProductPage ? 'product1.html' : 'products/product1.html'
        },
        'nedjeljni-sabah': {
            id: 'nedjeljni-sabah',
            name: 'Nedjeljni Sabah',
            price: '45',
            image: `${imagePath}svijeca2.jpg`,
            description: 'Aromatična svijeća',
            pageUrl: isProductPage ? 'product2.html' : 'products/product2.html'
        }
        // Dodaj ostale proizvode
    };

    // Slider funkcije ostaju iste kao i prije...

    // Funkcije za košaricu ostaju iste...

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
        if (!favoriteCountElement) return;
        
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favoriteCountElement.textContent = favorites.length;
        favoriteCountElement.style.display = favorites.length > 0 ? 'flex' : 'none';
    }

    function toggleFavorite(productId) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const product = products[productId];
        
        if (!product) return;

        const favoriteProduct = {
            ...product,
            addedAt: new Date().toISOString()
        };
        
        const existingIndex = favorites.findIndex(item => item.id === productId);
        
        if (existingIndex === -1) {
            favorites.push(favoriteProduct);
        } else {
            favorites.splice(existingIndex, 1);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteStatus();
        updateFavoriteCount();
    }

    // Event listeneri
    likeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.dataset.productId;
            toggleFavorite(productId);
        });
    });

    // Ostali event listeneri ostaju isti...

    // Inicijalizacija
    updateCartCount();
    updateFavoriteStatus();
    updateFavoriteCount();
});
