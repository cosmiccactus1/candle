// script.js
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const images = document.querySelectorAll('.product-image');
    
    let currentIndex = 0;
    const totalImages = images.length;

    // Dodajemo indikatore
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'image-indicators';
    for (let i = 0; i < totalImages; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.addEventListener('click', () => showImage(i));
        indicatorsContainer.appendChild(indicator);
    }
    document.querySelector('.product-images').appendChild(indicatorsContainer);

    const indicators = document.querySelectorAll('.indicator');

    function showImage(index) {
        sliderContainer.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateIndicators();
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);

    // Automatsko listanje svakih 5 sekundi
    setInterval(showNextImage, 5000);

    // Inicijalno postavljanje indikatora
    updateIndicators();
});
