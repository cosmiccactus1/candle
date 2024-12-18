document.addEventListener('DOMContentLoaded', function() {
    // DOM elementi
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const images = document.querySelectorAll('.product-image');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const likeButton = document.querySelector('.like-button');
    const cartCount = document.querySelector('header .cart-count');
    const addToCartButton = document.querySelector('.add-to-cart');
    const cartModal = document.querySelector('.cart-modal');
    const continueShopping = document.querySelector('.continue-shopping');
    const viewCart = document.querySelector('.view-cart');
    const resetCartButton = document.querySelector('.reset-cart');
    
    // Slider varijable
    let currentIndex = 0;
    const totalImages = images?.length || 0;
    let autoRotateInterval;

    // Košarica funkcije
    function updateCartCount() {
        const currentCount = parseInt(localStorage.getItem('cartCount')) || 0;
        if (cartCount) {
            cartCount.textContent = currentCount;
            cartCount.style.display = currentCount > 0 ? 'flex' : 'none';
        }
    }

    function showCartModal() {
        if (cartModal) {
            cartModal.style.display = 'flex';
            setTimeout(() => {
                cartModal.style.display = 'none';
            }, 5000);
        }
    }

    function resetCart() {
        localStorage.setItem('cartCount', '0');
        updateCartCount();
    }

    // Slider funkcije
    function showImage(index) {
        if (sliderContainer && window.innerWidth < 768) {
            sliderContainer.style.transform = `translateX(-${index * 100}%)`;
        } else if (sliderContainer) {
            sliderContainer.style.transform = 'none';
        }
        currentIndex = index;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }

    function handleSwipe(startX, endX) {
        if (window.innerWidth < 768) {
            if (startX - endX > 50) showNextImage();
            if (endX - startX > 50) showPrevImage();
        }
    }

    function startAutoRotate() {
        if (window.innerWidth < 768) {
            autoRotateInterval = setInterval(showNextImage, 5000);
        }
    }

    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    // Favoriti funkcionalnost
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const heartIcon = likeButton?.querySelector('i');
    const favoriteCountElement = document.getElementById('favorite-count');

    function updateFavoriteStatus() {
        if (!heartIcon) return;
        
        if (favorites.includes('product-id')) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
        }
    }

    function updateFavoriteCount() {
        if (!favoriteCountElement) return;
        
        favoriteCountElement.textContent = favorites.length;
        favoriteCountElement.style.display = favorites.length > 0 ? 'inline' : 'none';
    }

    function toggleFavorite() {
        const productId = 'product-id'; // Zamijenite s pravim ID-jem proizvoda
        if (favorites.includes(productId)) {
            favorites = favorites.filter(id => id !== productId);
        } else {
            favorites.push(productId);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteStatus();
        updateFavoriteCount();
    }

    // Event listeneri
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            const currentCount = parseInt(localStorage.getItem('cartCount')) || 0;
            localStorage.setItem('cartCount', currentCount + 1);
            updateCartCount();
            showCartModal();
        });
    }

    if (continueShopping) {
        continueShopping.addEventListener('click', function() {
            cartModal.style.display = 'none';
        });
    }

    if (viewCart) {
        viewCart.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }

    if (resetCartButton) {
        resetCartButton.addEventListener('click', resetCart);
    }

    if (likeButton) {
        likeButton.addEventListener('click', toggleFavorite);
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // Touch događaji za slider
    if (sliderContainer) {
        let touchStartX = 0;
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            stopAutoRotate();
        });

        sliderContainer.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            handleSwipe(touchStartX, touchEndX);
            startAutoRotate();
        });
    }

    // Resize handler
    window.addEventListener('resize', () => {
        showImage(currentIndex);
        stopAutoRotate();
        startAutoRotate();
    });

    // Inicijalizacija
    if (totalImages > 0) {
        showImage(currentIndex);
        startAutoRotate();
    }
    updateFavoriteStatus();
    updateFavoriteCount();
    updateCartCount();
    
    // Odkomentiraj sljedeću liniju ako želiš resetovati košaricu pri učitavanju
    // resetCart();
});
