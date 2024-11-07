document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const images = document.querySelectorAll('.product-image');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const likeButton = document.querySelector('.like-button');
    
    let currentIndex = 0;
    const totalImages = images.length;
    let autoRotateInterval;
    
    function showImage(index) {
        if (window.innerWidth < 768) {
            sliderContainer.style.transform = `translateX(-${index * 100}%)`;
        } else {
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
            if (startX - endX > 50) {
                showNextImage();
            }
            if (endX - startX > 50) {
                showPrevImage();
            }
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
    
    // Touch events za swipe na mobilnim uređajima
    let touchStartX = 0;
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoRotate();
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        handleSwipe(touchStartX, touchEndX);
        startAutoRotate();
    });
    
    // Event listeneri za dugmad
    prevButton.addEventListener('click', () => {
        showPrevImage();
        stopAutoRotate();
        startAutoRotate();
    });
    
    nextButton.addEventListener('click', () => {
        showNextImage();
        stopAutoRotate();
        startAutoRotate();
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
        cartCount.textContent = currentCount;
        localStorage.setItem('cartCount', currentCount);
        
        // Sakrij brojač ako je 0
        if (currentCount === 0) {
            cartCount.style.display = 'none';
        } else {
            cartCount.style.display = 'flex';
        }
    }
    
    // Postavi inicijalni broj
    updateCartCount();
    
    // Dodaj event listener na "Dodaj u košaricu" dugme
    addToCartButton.addEventListener('click', () => {
        currentCount++;
        updateCartCount();
    });
