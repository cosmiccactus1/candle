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
                    <h3>${
