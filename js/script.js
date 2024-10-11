document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const images = document.querySelectorAll('.product-image');
    
    let currentIndex = 0;
    const totalImages = images.length;

    function showImage(index) {
        if (window.innerWidth < 768) {
            sliderContainer.style.transform = `translateX(-${index * 100}%)`;
        } else {
            sliderContainer.style.transform = `translateY(-${index * 100}%)`;
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

    // Touch events za swipe na mobilnim uređajima
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        if (window.innerWidth < 768) {
            if (touchStartX - touchEndX > 50) {
                showNextImage();
            }
            if (touchEndX - touchStartX > 50) {
                showPrevImage();
            }
        } else {
            if (touchStartY - touchEndY > 50) {
                showNextImage();
            }
            if (touchEndY - touchStartY > 50) {
                showPrevImage();
            }
        }
    }

    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Automatska rotacija svakih 5 sekundi
    setInterval(showNextImage, 5000);

    // Inicijalno postavljanje
    showImage(currentIndex);

    // Resetiranje prikaza pri promjeni veličine prozora
    window.addEventListener('resize', () => {
        showImage(currentIndex);
    });
});
