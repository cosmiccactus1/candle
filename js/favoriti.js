document.addEventListener('DOMContentLoaded', () => {
    const favoriteList = document.getElementById('favorite-list');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length > 0) {
        favoriteList.innerHTML = ''; // Očisti sadržaj

        favorites.forEach(item => {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');
            favoriteItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="100">
                <p>${item.name}</p>
            `;
            favoriteList.appendChild(favoriteItem);
        });
    } else {
        favoriteList.innerHTML = `<p>Još nemate omiljenih stavki.</p>`;
    }
});
