document.addEventListener('DOMContentLoaded', () => {
    const favoriteList = document.getElementById('favorite-list');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length > 0) {
        favorites.forEach(id => {
            const listItem = document.createElement('li');
            listItem.textContent = `Omiljeni ID: ${id}`;
            favoriteList.appendChild(listItem);
        });
    } else {
        favoriteList.textContent = "Nema omiljenih stavki.";
    }
});

