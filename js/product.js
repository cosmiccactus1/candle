const productsData = {
    items: [
        {
            id: "planinska-koliba",
            name: "Planinska Koliba",
            price: "16.99 BAM",
            image: "../images/planinskakoliba.jpg",
            dateAdded: "2024-03-26"
        }
    ],
    renderMosaic() {
        const container = document.querySelector('.mosaic-grid');
        if (!container) return;

        container.innerHTML = this.items.map(product => `
            <div class="mosaic-item">
                <img src="images/${product.image}" 
                     alt="${product.name}" 
                     class="mosaic-image">
                <div class="mosaic-overlay">
                    <h3>${product.name}</h3>
                    <a href="#" class="view-product">Pogledaj više</a>
                </div>
            </div>
        `).join('');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    productsData.renderMosaic();
});
