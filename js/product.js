document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleDescription');
    const productDescription = document.getElementById('productDescription');

    toggleButton.addEventListener('click', function() {
        productDescription.classList.toggle('hidden');
        toggleButton.textContent = productDescription.classList.contains('hidden') ? 'Prikaži opis' : 'Sakrij opis';
    });
});
