document.addEventListener('DOMContentLoaded', function() {
   const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
   const cartItemsContainer = document.getElementById('cartItems');
   
   function renderOrderSummary() {
       cartItemsContainer.innerHTML = '';
       let subtotal = 0;
       let discount = localStorage.getItem('newsletterDiscount') ? 0.1 : 0;
       
       cartItems.forEach(item => {
           const cijena = parseFloat(item.cijena);
           const kolicina = parseInt(item.kolicina);
           const itemTotal = cijena * kolicina;
           subtotal += itemTotal;
           
           const itemElement = document.createElement('div');
           itemElement.className = 'cart-item';
           itemElement.innerHTML = `
               <img src="images/${item.image}" alt="${item.naziv}" class="cart-item-image">
               <div class="cart-item-details">
                   <h3>${item.naziv}</h3>
                   <p>Količina: ${kolicina}</p>
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

   // Newsletter pretplata
   document.getElementById('newsletterForm').addEventListener('submit', function(e) {
       e.preventDefault();
       
       fetch('newsletter.php', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               email: document.getElementById('newsletterEmail').value
           })
       })
       .then(response => response.json())
       .then(data => {
           if (data.success) {
               localStorage.setItem('newsletterDiscount', true);
               alert('Uspješno ste se pretplatili! Vaš kod za popust je: ' + data.message.split(': ')[1]);
               document.getElementById('newsletterEmail').value = '';
               renderOrderSummary();
           } else {
               alert(data.message);
           }
       })
       .catch(error => alert('Došlo je do greške pri prijavi na newsletter'));
   });

   // Narudžba
   document.getElementById('orderForm').addEventListener('submit', function(e) {
       e.preventDefault();
       
       if (this.checkValidity()) {
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
               total: parseFloat(document.getElementById('total').textContent)
           };

           fetch('order-confirmation.php', {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
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
           alert('Molimo popunite sva obavezna polja.');
       }
   });

   // Ažuriranje količine u košarici
   const cartCount = document.querySelector('.cart-count');
   if (cartCount) {
       const totalItems = cartItems.reduce((sum, item) => sum + parseInt(item.kolicina), 0);
       cartCount.textContent = totalItems;
       cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
   }

   // Inicijalno renderiranje
   renderOrderSummary();
});
