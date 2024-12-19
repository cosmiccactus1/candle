document.addEventListener('DOMContentLoaded', function() {
    const likeButton = document.querySelector('.like-button');
    const favoriteCountElement = document.getElementById('favorite-count');

    if (likeButton) {
        likeButton.addEventListener('click', function() {
            const product = {
                id: 'brijuni-svijeca', // Identifikator artikla
                name: document.querySelector('.product-header h1').textContent,
                image: 'svijeća1.jpg', // Ime slike 
                price: document.querySelector('.price').textContent,
                pageUrl: 'products/product1.html'
            };
            
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const isAlreadyFavorite = favorites.some(fav => fav.id === product.id);
            
            if (!isAlreadyFavorite) {
                favorites.push(product);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                
                // Promjena izgleda srca
                this.querySelector('i').classList.remove('far');
                this.querySelector('i').classList.add('fas');
                
                // Ažuriranje broja favorita
                if (favoriteCountElement) {
                    favoriteCountElement.textContent = favorites.length;
                    favoriteCountElement.style.display = 'flex';
                }
            }
        });
    }
});
