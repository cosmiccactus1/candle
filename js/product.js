// products.js
const productsData = {
    items: [
        {
            id: "planinska-koliba",
            name: "Planinska Koliba",
            price: "16.99 BAM",
            images: {
                main: "images/planinskakoliba.jpg",  // maknuli smo ../
                hover: "images/planinskakoliba-hover.jpg"
            },
            dateAdded: "2024-03-26",
            essences: ["Myrrh", "Frankincense", "Cedar"]
        },
        {
            id: "brijuni",
            name: "Brijuni",
            price: "35.00 BAM",
            images: {
                main: "images/brijuni.jpg",
                hover: "images/brijuni-hover.jpg"
            },
            dateAdded: "2024-03-25",
            essences: ["Ylang Ylang", "Sandalwood", "Bergamot"]
        }
    ],
    renderMosaic() {
        const container = document.querySelector('.mosaic-grid');
        console.log("Container found:", container); // debugging
        
        if (!container) {
            console.log("Container not found!");
            return;
        }

        const featuredProducts = this.items.slice(0, 6);
        console.log("Products to render:", featuredProducts); // debugging
        
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

        // Hover effects
        document.querySelectorAll('.mosaic-image').forEach(img => {
            img.addEventListener('mouseenter', function() {
                const hoverSrc = this.getAttribute('data-hover');
                if (hoverSrc) {
                    this.src = hoverSrc;
                }
            });

            img.addEventListener('mouseleave', function() {
                const mainSrc = this.src.replace('-hover', '');
                this.src = mainSrc;
            });
        });
    }
};

// Odmah izvršavamo renderovanje
productsData.renderMosaic();

// Također dodajemo i event listener za DOM
document.addEventListener('DOMContentLoaded', () => {
    productsData.renderMosaic();
});
