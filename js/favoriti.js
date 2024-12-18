document.addEventListener('DOMContentLoaded', function() {
    // Postojeći kod za slike, galeriju, itd.
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const images = document.querySelectorAll('.product-image');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const likeButton = document.querySelector('.like-button');
    const heartIcon = likeButton ? likeButton.querySelector('i') : null;  // Pronalazimo ikonu unutar likeButton
    const favoriteCountElement = document.getElementById('favorite-count');
    
    let currentIndex = 0;
    const totalImages = images.length;
    let autoRotateInterval;
    
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Funkcija za prikaz slike
    function showImage(index) {
        if (window.innerWidth < 768) {
            sliderContainer.style.transform = `translateX(-${index * 100}%)`;
        } else {
            sliderContainer.style.transform = 'none';
        }
        currentIndex = index;
    }

    // Funkcija za prelazak na sljedeću sliku
    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    // Funkcija za prelazak na prethodnu sliku
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }

    // Funkcija za swipe event
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

    // Funkcija za automatsko rotiranje slika
    function startAutoRotate() {
        if (window.innerWidth < 768) {
            autoRotateInterval = setInterval(showNextImage, 5000);
        }
    }

    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    // Funkcija za ažuriranje statusa "favorite"
    function updateFavoriteStatus() {
        if (heartIcon && favorites.includes('product-id')) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
        } else if (heartIcon) {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
        }
    }

    // Funkcija za ažuriranje broja favorita
    function updateFavoriteCount() {
        if (favoriteCountElement) {
            favoriteCountElement.textContent = favorites.length;
            if (favorites.length > 0) {
                favoriteCountElement.style.display = 'inline';
            } else {
                favoriteCountElement.style.display = 'none';
            }
        }
    }

    // Funkcija za toggle favorite status
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

    // Postavljanje event listenera na likeButton
    if (likeButton) {
        likeButton.addEventListener('click', function() {
            this.classList.toggle('liked');
            if (heartIcon) {
                heartIcon.classList.toggle('far');
                heartIcon.classList.toggle('fas');
            }
            toggleFavorite(); // Pozivamo funkciju za promjenu statusa favorita
        });
    }

    // Funkcionalnost za mobilni meni
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // Inicijalizacija slika
    showImage(currentIndex);
    startAutoRotate();

    // Poziv funkcija za inicijalizaciju stanja
    updateFavoriteStatus();
    updateFavoriteCount();

    window.addEventListener('resize', () => {
        showImage(currentIndex);
        stopAutoRotate();
        startAutoRotate();
    });
});

