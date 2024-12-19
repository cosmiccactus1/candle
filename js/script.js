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
            image: isProductPage ? '../images/svijeća1.jpg' : 
                   isCollectionPage ? 'images/svijeća1.jpg' : 
                   'images/svijeća1.jpg',
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

    // Slider funkcije
    let currentIndex = 0;
    const totalImages = images?.length || 0;

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function showImage(index) {
        if (sliderContainer && window.innerWidth < 768) {
            sliderContainer.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            updateDots();
        }
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }

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
        const currentProduct = isProductPage ? products['brijuni-svijeca'] : products['brijuni-svijeca'];
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
            favorites.push({
                ...product,
                addedAt: new Date().toISOString(),
                pageUrl: isProductPage ? 
                    `../products/product1.html` : 
                    `products/product1.html`
            });
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

    // Slider kontrole
    if (prevButton) prevButton.addEventListener('click', showPrevImage);
    if (nextButton) nextButton.addEventListener('click', showNextImage);

    // Touch events za slider
    if (sliderContainer) {
        let touchStartX = 0;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        sliderContainer.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) showNextImage();
                else showPrevImage();
            }
        });
    }

    // Mobilni meni
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // Dots za slider
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showImage(index));
    });

    // Window resize
    window.addEventListener('resize', () => showImage(currentIndex));

    // Inicijalizacija
    showImage(0);
    updateCartCount();
    updateFavoriteStatus();
    updateFavoriteCount();
});
