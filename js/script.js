document.addEventListener('DOMContentLoaded', function() {
    // Mobilni meni
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Zatvori meni kada se klikne izvan njega
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Zatvori meni kada se klikne na link (za mobilne uređaje)
    navLinks.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            navLinks.classList.remove('active');
        }
    });

    // Proširive sekcije
    const expandableSections = document.querySelectorAll('.expandable-section');

    expandableSections.forEach(section => {
        const title = section.querySelector('.section-title');
        const content = section.querySelector('.section-content');

        title.addEventListener('click', () => {
            title.classList.toggle('active');
            content.classList.toggle('active');
        });
    });

    // Dodavanje u favorite
    const favButton = document.querySelector('.add-to-favorites');

    favButton.addEventListener('click', function() {
        this.classList.toggle('active');
        const isFavorite = this.classList.contains('active');
        
        if (isFavorite) {
            this.querySelector('i').classList.remove('far');
            this.querySelector('i').classList.add('fas');
            console.log('Proizvod dodan u favorite');
        } else {
            this.querySelector('i').classList.remove('fas');
            this.querySelector('i').classList.add('far');
            console.log('Proizvod uklonjen iz favorita');
        }
    });
});
