document.addEventListener('DOMContentLoaded', function() {
    // Postojeći kod za slike, galeriju, itd.
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

    // Postavite funkcionalnost za like button
    if (likeButton) {
        likeButton.addEventListener('click', function() {
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    }

    // Ovdje se koristi kod za favorite
    const heartIcon = likeButton.querySelector('i');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteCountElement = document.getElementById('favorite-count');

    function updateFavoriteStatus() {
        if (favorites.includes('product-id')) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
        }
    }

    function updateFavoriteCount() {
        favoriteCountElement.textContent = favorites.length;
        if (favorites.length > 0) {
            favoriteCountElement.style.display = 'inline';
        } else {
            favoriteCountElement.style.display = 'none';
        }
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

    likeButton.addEventListener('click', toggleFavorite);
    updateFavoriteStatus();
    updateFavoriteCount();

    // Ovdje završava kod za favorite

    // Funkcionalnost za mobilni meni
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    showImage(currentIndex);
    startAutoRotate();

    window.addEventListener('resize', () => {
        showImage(currentIndex);
        stopAutoRotate();
        startAutoRotate();
    });
});
