document.addEventListener('DOMContentLoaded', function() {
    // Košarica
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Količina: ${item.quantity}</p>
            </div>
            <div class="cart-item-price">${(item.price * item.quantity).toFixed(2)} BAM</div>
        `;
        cartItemsContainer.appendChild(itemElement);
        subtotal += item.price * item.quantity;
    });
    
    const shipping = subtotal > 100 ? 0 : 5;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)} BAM`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'Besplatno' : `${shipping.toFixed(2)} BAM`;
    document.getElementById('total').textContent = `${total.toFixed(2)} BAM`;
    
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
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Došlo je do greške pri prijavi na newsletter');
        });
    });

    // Modal
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('newsletter-modal').style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        const modal = document.getElementById('newsletter-modal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Narudžba
    const orderForm = document.getElementById('orderForm');
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const required = orderForm.querySelectorAll('[required]');
        let isValid = true;
        
        required.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (!isValid) {
            alert('Molimo popunite sva obavezna polja.');
            return;
        }
        
        const order = {
            customerInfo: {
                firstName: orderForm.firstName.value,
                lastName: orderForm.lastName.value,
                email: orderForm.email.value,
                phone: orderForm.phone.value,
                address: orderForm.address.value,
                city: orderForm.city.value,
                postalCode: orderForm.postalCode.value
            },
            items: cart,
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            orderDate: new Date().toISOString()
        };
        
        console.log('Narudžba poslana:', order);
        localStorage.removeItem('cart');
        alert('Vaša narudžba je uspješno zaprimljena!');
    });
});
