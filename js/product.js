// products.js
const productsData = {
    items: [
        {
            id: "planinska-koliba",
            name: "Planinska Koliba",
            price: "35 BAM",
            images: {
                main: "../images/planinskakoliba.jpg",
                hover: "images/planinskakoliba-hover.jpg" // alternativna slika
            },
            dateAdded: "2024-03-26",
            essences: ["Myrrh", "Frankincense", "Cedar"]
        },
        // Dodajte ostale proizvode
    ],

    renderMosaic() {
        const container = document.querySelector('.mosaic-grid');
        if (!container) return;

        const featuredProducts = this.items.slice(0, 6); // Prikazujemo prvih 6 proizvoda
        
        container.innerHTML = featuredProducts.map(product => `
            <div class="mosaic-item">
                <img src="${product.images.main}" 
                     data-hover="${product.images.hover}" 
                     alt="${product.name}" 
                     class="mosaic-image">
                <div class="mosaic-overlay">
                    <h3>${product.name}</h3>
                    <a href="products/${product.id}.html" class="view-product">Pogledaj više</a>
                </div>
            </div>
        `).join('');

        // Dodajemo hover efekt za promjenu slika
        document.querySelectorAll('.mosaic-image').forEach(img => {
            const hoverImage = new Image();
            hoverImage.src = img.getAttribute('data-hover');
            
            img.addEventListener('mouseenter', function() {
                if (this.getAttribute('data-hover')) {
                    this.style.opacity = '0';
                    setTimeout(() => {
                        this.src = this.getAttribute('data-hover');
                        this.style.opacity = '1';
                    }, 200);
                }
            });

            img.addEventListener('mouseleave', function() {
                if (this.getAttribute('data-hover')) {
                    this.style.opacity = '0';
                    setTimeout(() => {
                        this.src = this.getAttribute('data-original') || product.images.main;
                        this.style.opacity = '1';
                    }, 200);
                }
            });
        });
    },

    // Funkcija za dodavanje novog proizvoda
    addProduct(product) {
        this.items.unshift(product); // Dodaje na početak niza
        this.renderMosaic(); // Ponovno renderuje mozaik
    }
};

// Inicijalizacija nakon učitavanja stranice
document.addEventListener('DOMContentLoaded', () => {
    productsData.renderMosaic();
});
