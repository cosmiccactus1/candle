document.addEventListener('DOMContentLoaded', function() {
    // DOM elementi
    const cartCount = document.querySelector('.cart-count');
    const cartModal = document.querySelector('.cart-modal');
    const favoriteCountElement = document.getElementById('favorite-count');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    // Definicija proizvoda
    const products = {
        'brijuni-svijeca': {
            id: 'brijuni-svijeca',
            name: 'B R I J U N I',
            price: '24,99',
            image: 'images/brijuni.jpg',
            description: 'Luksuzna aromatična svijeća'
        },
        'nedjeljni-sabah': {
            id: 'nedjeljni-sabah',
            name: 'NEDJELJNI SABAH',
            price: '24,99',
            image: 'images/nedjeljnisabah.jpg',
            description: 'Aromatična svijeća'
        },
        'planinska-koliba': {
            id: 'planinska-koliba',
            name: 'PLANINSKA KOLIBA',
            price: '16,99',
            image: 'images/planinskakoliba.jpg',
            description: 'Mirisna svijeća'
        },
        'zumbul': {
            id: 'zumbul',
            name: 'Z U M B U L',
            price: '55',
            image: 'images/zumbul.jpg',
            description: 'Aromatična svijeća'
        },
        'volim-te': {
            id: 'volim-te',
            name: 'VOLIM TE',
            price: '16,99',
            image: 'images/volimte.jpg',
            description: 'LTD VALENTINES EDITION'
        }
    };
 'bona-beast': {
id: 'bona-beast',
name: 'B O N A & B E A S T',
price: '19,99',
image: 'images/bonaibeast.jpg',
description: 'Luksuzna aromatična svijeća'
}
};
    // Dodaj dugme za ceger u kolekciji
    document.querySelectorAll('.kolekcija-item').forEach(item => {
        const cartButton = document.createElement('button');
        cartButton.className = 'cart-button';
        cartButton.innerHTML = 'Dodaj u ceger';
        item.appendChild(cartButton);
    });

    // Funkcije za ceger
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartCount) {
            // Zbroji sve količine proizvoda
            const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalQuantity;
            cartCount.style.display = totalQuantity > 0 ? 'flex' : 'none';
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

    function addToCart(productId) {
        console.log('Dodavanje u ceger:', productId);
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const product = products[productId];
        
        if (!product) {
            console.error('Proizvod nije pronađen:', productId);
            return;
        }

        // Provjeri postoji li proizvod već u košarici
        const existingItemIndex = cartItems.findIndex(item => item.id === productId);
        
        if (existingItemIndex !== -1) {
            // Ako proizvod već postoji, povećaj količinu
            cartItems[existingItemIndex].quantity += 1;
            console.log('Povećana količina za proizvod:', productId);
        } else {
            // Ako proizvod ne postoji, dodaj ga s količinom 1
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
            console.log('Dodan novi proizvod:', productId);
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        showCartModal();
    }

    // Event listeneri za ceger dugmad u kolekciji
    document.querySelectorAll('.cart-button').forEach(button => {
        const productItem = button.closest('.kolekcija-item');
        const likeButton = productItem.querySelector('.like-button');
        const productId = likeButton?.dataset.productId;
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(productId);
        });
    });

    // Event listener za "Dodaj u ceger" na stranici proizvoda
    if (document.querySelector('.add-to-cart')) {
        const addToCartButton = document.querySelector('.add-to-cart');
        const likeButton = document.querySelector('.like-button');
        const productId = likeButton?.dataset.productId;

        addToCartButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (productId) {
                addToCart(productId);
            }
        });
    }

    // Funkcije za favorite
    function updateFavoriteCount() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favoriteCountElement) {
            favoriteCountElement.textContent = favorites.length;
            favoriteCountElement.style.display = favorites.length > 0 ? 'flex' : 'none';
        }
    }

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

    // Event listeneri za like dugmad
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = button.dataset.productId;
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const product = products[productId];
            
            if (!product) {
                console.error('Proizvod nije pronađen:', productId);
                return;
            }

            const existingIndex = favorites.findIndex(item => item.id === productId);
            
            if (existingIndex === -1) {
                favorites.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    description: product.description,
                    addedAt: new Date().toISOString()
                });
            } else {
                favorites.splice(existingIndex, 1);
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoriteStatus();
            updateFavoriteCount();
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

    // CSS za dugme
    const style = document.createElement('style');
    style.textContent = `
        .cart-button {
            width: 100%;
            padding: 10px;
            background-color: #333;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
            transition: background-color 0.3s;
        }
        .cart-button:hover {
            background-color: #555;
        }
        .kolekcija-item {
            padding-bottom: 15px;
            position: relative;
        }
    `;
    document.head.appendChild(style);

    // Inicijalizacija
    updateCartCount();
    updateFavoriteStatus();
    updateFavoriteCount();

    // Event listeneri za modal
    if (document.querySelector('.close-modal')) {
        document.querySelector('.close-modal').addEventListener('click', hideCartModal);
    }
    if (document.querySelector('.continue-shopping')) {
        document.querySelector('.continue-shopping').addEventListener('click', hideCartModal);
    }
});
