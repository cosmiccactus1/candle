document.addEventListener('DOMContentLoaded', function() {
    console.log("Favoriti JS učitan");
    // Dodaj ovo odmah nakon console.log("DOM je učitan!");
function resetCounts() {
    if (window.location.pathname.includes('products/')) {
        localStorage.removeItem('favorites');
        localStorage.removeItem('cartItems');
        updateFavoriteCount();
        updateCartCount();
    }
}

resetCounts();
    const favoritesContainer = document.querySelector('.favorites-container');
    const emptyFavorites = document.querySelector('.empty-favorites');
    const favoriteCountElement = document.getElementById('favorite-count');

    // Definiramo proizvod
    const productData = {
        id: 'brijuni-svijeca',
        name: 'Brijuni svijeća',
        price: '35',
        image: 'images/svijeća1.jpg',
        pageUrl: 'products/product1.html'
    };

    function updateFavoriteCount() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favoriteCountElement) {
            favoriteCountElement.textContent = favorites.length;
            favoriteCountElement.style.display = favorites.length > 0 ? 'flex' : 'none';
        }
    }

    function displayFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        console.log("Učitani favoriti:", favorites); // Za debugiranje
        
        if (favorites.length === 0) {
            if (favoritesContainer) favoritesContainer.style.display = 'none';
            if (emptyFavorites) emptyFavorites.style.display = 'block';
            return;
        }

        if (favoritesContainer) {
            favoritesContainer.style.display = 'grid';
            favoritesContainer.innerHTML = favorites.map(product => `
                <div class="favorite-item" data-id="${product.id || 'undefined'}">
                    <img src="${product.image || 'images/svijeća1.jpg'}" alt="${product.name || 'Svijeća'}">
                    <h3>${product.name || 'Brijuni svijeća'}</h3>
                    <p class="price">${product.price || '35'} BAM</p>
                    <div class="favorite-actions">
                        <button class="remove-favorite" onclick="removeFavorite('${product.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                        <a href="${product.pageUrl || 'products/product1.html'}" class="view-product">
                            Pogledaj proizvod
                        </a>
                    </div>
                </div>
            `).join('');
        }
        
        if (emptyFavorites) {
            emptyFavorites.style.display = 'none';
        }
    }

    function removeFavorite(productId) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = favorites.filter(item => item.id !== productId);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        displayFavorites();
        updateFavoriteCount();
    }

    // Inicijalizacija
    displayFavorites();
    updateFavoriteCount();

    // Postavi globalnu funkciju za uklanjanje favorita
    window.removeFavorite = removeFavorite;
});
