document.addEventListener('DOMContentLoaded', function() {
    // DOM elementi
    const cartCount = document.querySelector('.cart-count');
    const cartModal = document.querySelector('.cart-modal');
    const favoriteCountElement = document.getElementById('favorite-count');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    // Definicija proizvoda - usklađena s HTML-om
    const products = {
        'brijuni-svijeca': {
            id: 'brijuni-svijeca',
            name: 'B R I J U N I',
            price: '24,99',
            image: 'images/brijuni.jpg',
            description: 'Luksuzna aromatična svijeća',
            pageUrl: 'products/product1.html'
        },
        'nedjeljni-sabah': {
            id: 'nedjeljni-sabah',
            name: 'NEDJELJNI SABAH',
            price: '24,99',
            image: 'images/nedjeljnisabah.jpg',
            description: 'Aromatična svijeća',
            pageUrl: 'products/product2.html'
        },
        'planinska-koliba': {
            id: 'planinska-koliba',
            name: 'PLANINSKA KOLIBA',
            price: '16,99',
            image: 'images/planinskakoliba.jpg',
            description: 'Mirisna svijeća',
            pageUrl: 'products/planinskakoliba.html'
        },
        'zumbul': {
            id: 'zumbul',
            name: 'Z U M B U L',
            price: '55',
            image: 'images/zumbul.jpg',
            description: 'Aromatična svijeća',
            pageUrl: 'products/product4.html'
        },
        'volim-te': {
            id: 'volim-te',
            name: 'VOLIM TE',
            price: '16,99',
            image: 'images/volimte.jpg',
            description: 'LTD VALENTINES EDITION',
            pageUrl: 'products/volimte.html'
        }
    };

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

    // Dodaj u košaricu
    function addToCart(productId) {
        console.log('Dodavanje proizvoda u košaricu:', productId);
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const product = products[productId];
        
        if (!product) {
            console.error('Proizvod nije pronađen:', productId);
            return;
        }

        cartItems.push({
            id: product.id,            // Dodano
            name: product.name,        // Dodano
            price: product.price,      // Dodano
            image: product.image,      // Dodano
            description: product.description, // Dodano
            quantity: 1,
            addedAt: new Date().toISOString()
        });
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Stanje košarice nakon dodavanja:', cartItems); // Za debugiranje
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
        console.log('Toggle favorite za proizvod:', productId);
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const product = products[productId];
        
        if (!product) {
            console.error('Proizvod nije pronađen:', productId);
            return;
        }

        const existingIndex = favorites.findIndex(item => item.id === productId);
        
        if (existingIndex === -1) {
            const productToAdd = {
                id: product.id,            // Dodano
                name: product.name,        // Dodano
                price: product.price,      // Dodano
                image: product.image,      // Dodano
                description: product.description, // Dodano
                addedAt: new Date().toISOString()
            };
            favorites.push(productToAdd);
            console.log('Dodan u favorite');
        } else {
            favorites.splice(existingIndex, 1);
            console.log('Uklonjen iz favorita');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteStatus();
        updateFavoriteCount();
    }

    // Dodaj dugmad za košaricu
    document.querySelectorAll('.kolekcija-item').forEach(item => {
        const likeButton = item.querySelector('.like-button');
        const productId = likeButton?.dataset.productId;

        if (productId) {
            const cartButton = document.createElement('button');
            cartButton.className = 'cart-button';
            cartButton.innerHTML = 'Dodaj u korpu';
            item.appendChild(cartButton);

            cartButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(productId);
            });
        }
    });

    // Event listeneri za like buttons
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const productId = button.dataset.productId;
            if (productId) {
                toggleFavorite(productId);
            }
        });
    });

    // Mobilni meni
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                navLinks.classList.contains('active'));
        });
    }

    // Inicijalizacija
    updateCartCount();
    updateFavoriteStatus();
    updateFavoriteCount();
});
