document.addEventListener('DOMContentLoaded', function() {
    // Dohvat košarice iz localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    function renderOrderSummary() {
        let subtotal = 0;
        let discount = localStorage.getItem('newsletterDiscount') ? 0.1 : 0; // 10% ako postoji popust
        
        cartItems.forEach(item => {
            const price = parseFloat(item.price.replace(',', '.'));
            const quantity = item.quantity || 1;
            const itemTotal = price * quantity;
            subtotal += itemTotal;
            
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
        
        const discountAmount = subtotal * discount;
        const shipping = subtotal > 100 ? 0 : 5;
        const total = subtotal - discountAmount + shipping;

        document.querySelector('.summary-details').innerHTML = `
            <div class="summary-row">
                <span>Međuzbroj:</span>
                <span id="subtotal">${subtotal.toFixed(2)} BAM</span>
            </div>
            ${discount ? `
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

    // Newsletter
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        
        fetch('newsletter.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const modal = document.getElementById('newsletter-modal');
                const discountCode = modal.querySelector('.discount-code');
                discountCode.textContent = data.message.split(': ')[1];
                modal.style.display = 'block';
                document.getElementById('newsletterEmail').value = '';
                localStorage.setItem('newsletterDiscount', true);
                renderOrderSummary();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Došlo je do greške pri prijavi na newsletter');
        });
    });

    // Modal kontrole
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('newsletter-modal').style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        const modal = document.getElementById('newsletter-modal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Order form
    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (this.checkValidity()) {
            const subtotal = parseFloat(document.getElementById('subtotal').textContent);
            const shipping = document.getElementById('shipping').textContent === 'Besplatno' ? 0 : 5;
            const total = parseFloat(document.getElementById('total').textContent);

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
                subtotal: subtotal,
                shipping: shipping,
                discount: localStorage.getItem('newsletterDiscount') ? 0.1 : 0,
                total: total
            };

            console.log('Narudžba:', orderData);
            localStorage.removeItem('cartItems');
            alert('Vaša narudžba je uspješno zaprimljena!');
            window.location.href = 'index.html';
        } else {
            alert('Molimo popunite sva obavezna polja.');
        }
    });

    // Inicijalno renderiranje
    renderOrderSummary();
});
