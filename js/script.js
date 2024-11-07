document.addEventListener('DOMContentLoaded', function() {
    // Funkcionalnost za mobilni meni
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Postojeći kod za menu
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // Dodani kod za prikaz broja košarice
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(localStorage.getItem('cartCount')) || 0;
        if (currentCount > 0) {
            cartCount.textContent = currentCount;
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
});
