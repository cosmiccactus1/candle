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
    const likeButton = document.querySelector('.like-button');
    const cartCount = document.querySelector('.cart-count');
    const addToCartButton = document.querySelector('.add-to-cart');
    const cartModal = document.querySelector('.cart-modal');
    const closeModal = document.querySelector('.close-modal');
    const continueShopping = document.querySelector('.continue-shopping');
    const viewCart = document.querySelector('.view-cart');
    const checkout = document.querySelector('.checkout');
    const favoriteCountElement = document.getElementById('favorite-count');
    const dots = document.querySelectorAll('.dot');
    
    // Provjera trenutne stranice za ispravne putanje
    const isProductPage = window.location.pathname.includes('products/');
    const imagePath = isProductPage ? '../images/' : 'images/';
    const redirectPath = isProductPage ? '../' : '';

    // Trenutni proizvod - podaci o proizvodu koji se prikazuje
    const currentProduct = {
        id: 'brijuni-svijeca',
        name: 'Brijuni svijeća',
        price: '35',
        image: `${imagePath}svijeća1.jpg`,
        description: 'Luksuzna aromatična svijeća',
        scents: ['Ylang Ylang', 'Sandalwood', 'Bergamot']
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

    function addToCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push({
            ...currentProduct,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        showCartModal();
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

    // Funkcije za favorite
    function updateFavoriteStatus() {
        if (!likeButton) return;
        
        const heartIcon = likeButton.querySelector('i');
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        if (favorites.find(item => item.id === currentProduct.id)) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            likeButton.classList.add('liked');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            likeButton.classList.remove('liked');
        }
    }

    function updateFavoriteCount() {
        if (!favoriteCountElement) return;
        console.log("Updating favorite count");
        
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        console.log("Number of favorites:", favorites.length);
        
        favoriteCountElement.textContent = favorites.length;
        favoriteCountElement.style.display = favorites.length > 0 ? 'flex' : 'none';
    }

    function toggleFavorite() {
        console.log("Toggle favorite called");
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteProduct = {
            ...currentProduct,
            addedAt: new Date().toISOString(),
            pageUrl: `${redirectPath}products/product1.html`
        };
        
        const existingIndex = favorites.findIndex(item => item.id === currentProduct.id);
        
        if (existingIndex === -1) {
            favorites.push(favoriteProduct);
            console.log("Added to favorites");
        } else {
            favorites.splice(existingIndex, 1);
            console.log("Removed from favorites");
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteStatus();
        updateFavoriteCount();
    }

    // Event listeneri
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

    // Košarica event listeneri
    if (addToCartButton) addToCartButton.addEventListener('click', addToCart);
    if (closeModal) closeModal.addEventListener('click', hideCartModal);
    if (continueShopping) continueShopping.addEventListener('click', hideCartModal);
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

    // Favoriti event listener
    if (likeButton) {
        likeButton.addEventListener('click', toggleFavorite);
        console.log("Like button event listener added");
    }

    // Mobilni meni
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                navLinks.classList.contains('active'));
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
