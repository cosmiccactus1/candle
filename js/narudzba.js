document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    function renderOrderSummary() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Vaša košarica je prazna</p>';
            return;
        }
        
        cartItems.forEach(item => {
            const price = parseFloat(item.price.replace(',', '.'));
            const quantity = parseInt(item.quantity) || 1;
            const itemTotal = price * quantity;
            
            if (!isNaN(itemTotal)) {
                subtotal += itemTotal;
            }
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Količina: ${quantity}</p>
                </div>
                <div class="cart-item-price">${itemTotal.toFixed(2)} BAM</div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        const hasDiscount = localStorage.getItem('newsletterDiscount') === 'true';
        const discountAmount = hasDiscount ? subtotal * 0.1 : 0;
        const shipping = subtotal > 100 ? 0 : 5;
        const total = subtotal - discountAmount + shipping;

        document.querySelector('.summary-details').innerHTML = `
            <div class="summary-row">
                <span>Međuzbroj:</span>
                <span id="subtotal">${subtotal.toFixed(2)} BAM</span>
            </div>
            ${hasDiscount ? `
            <div class="summary-row">
                <span>Newsletter popust (10%):</span>
                <span class="discount-amount">-${discountAmount.toFixed(2)} BAM</span>
            </div>` : ''}
            <div class="summary-row">
                <span>Dostava:</span>
                <span id="shipping">${shipping === 0 ? 'Besplatno' : shipping.toFixed(2) + ' BAM'}</span>
            </div>
            <div class="summary-row total">
                <span>Ukupno:</span>
                <span id="total">${total.toFixed(2)} BAM</span>
            </div>
        `;
    }

    // Forma za narudžbu
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!cartItems.length) {
                alert('Vaša košarica je prazna');
                return;
            }
            
            if (this.checkValidity()) {
                const total = document.querySelector('.summary-row.total span:last-child').textContent;
                
                const orderData = {
                    customerInfo: {
                        firstName: this.firstName.value,
                        lastName: this.lastName.value,
                        email: this.email.value,
                        phone: this.phone.value,
                        address: this.address.value,
                        city: this.city.value,
                        postalCode: this.postalCode.value
                    },
                    items: cartItems,
                    total: total
                };

                fetch('order-confirmation.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        localStorage.removeItem('cartItems');
                        alert(`Hvala na narudžbi! Vaš broj narudžbe je: ${data.orderNumber}`);
                        window.location.href = 'index.html';
                    }
                })
                .catch(error => alert('Došlo je do greške pri obradi narudžbe'));
            } else {
                alert('Molimo popunite sva obavezna polja');
            }
        });
    }

    // Ažuriranje broja artikala u headeru
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cartItems.reduce((sum, item) => sum + parseInt(item.quantity || 1), 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Inicijalno renderiranje
    renderOrderSummary();
});
