document.addEventListener('DOMContentLoaded', function() {
    const favoriteBtn = document.getElementById('favoriteBtn');
    const favoritesCount = document.querySelector('.nav-right .fa-heart');
    let count = 0;

    favoriteBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            count++;
        } else {
            count = Math.max(0, count - 1);
        }
        if (count > 0) {
            favoritesCount.setAttribute('data-count', count);
        } else {
            favoritesCount.removeAttribute('data-count');
        }
    });
});
