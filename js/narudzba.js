document.addEventListener('DOMContentLoaded', function() {
    // Dohvati podatke iz košarice
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Popuni pregled narudžbe
    function renderOrderSummary() {
        const summaryContainer = document.querySelector('.order-summary');
        if (!summaryContainer) return;

        let summaryHTML = '<div class="section-title">Vaša narudžba</div>';
        let total = 0;
        
        cartItems.forEach(item => {
            const itemTotal = item.price * (item.quantity || 1);
            total += itemTotal;
            
            summaryHTML += `
                <div class="summary-item">
                    <div class="item-details">
                        <img src="${item.image}" alt="${item.name}" class="item-image">
                        <div class="item-info">
                            <h3>${item.name}</h3>
                            <p>Količina: ${item.quantity || 1}</p>
                        </div>
                    </div>
                    <div class="item-price">${itemTotal} BAM</div>
                </div>
            `;
        });

        // Dodaj dostavu
        const shipping = 5;
        total += shipping;
        
        summaryHTML += `
            <div class="summary-item">
                <div class="item-info">
                    <h3>Dostava</h3>
                </div>
                <div class="item-price">${shipping} BAM</div>
            </div>
            
            <div class="summary-total">
                <span>Ukupno:</span>
                <span>${total} BAM</span>
            </div>
        `;
        
        summaryContainer.innerHTML = summaryHTML;
    }

    // Upravljanje formom
    const orderForm = document.getElementById('orderForm');
    const createAccountCheckbox = document.getElementById('createAccount');
    const accountFields = document.querySelector('.account-fields');

    // Prikaz/sakrivanje polja za lozinku
    if (createAccountCheckbox && accountFields) {
        createAccountCheckbox.addEventListener('change', function() {
            accountFields.style.display = this.checked ? 'block' : 'none';
            const passwordInputs = accountFields.querySelectorAll('input[type="password"]');
            passwordInputs.forEach(input => {
                input.required = this.checked;
            });
        });
    }

    // Validacija forme
    function validateForm(formData) {
        const errors = [];

        // Osnovna validacija emaila
        const email = formData.get('email');
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.push('Unesite ispravnu email adresu');
        }

        // Validacija telefona (dopušta različite formate)
        const phone = formData.get('phone');
        if (!phone.match(/^[\d\s\-+()]{6,}$/)) {
            errors.push('Unesite ispravan broj telefona');
        }

        // Validacija poštanskog broja
        const postalCode = formData.get('postalCode');
        if (!postalCode.match(/^\d{5}$/)) {
            errors.push('Unesite ispravan poštanski broj (5 brojeva)');
        }

        // Validacija lozinke ako se kreira račun
        if (formData.get('createAccount') === 'on') {
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');

            if (password.length < 8) {
                errors.push('Lozinka mora imati najmanje 8 karaktera');
            }

            if (password !== confirmPassword) {
                errors.push('Lozinke se ne podudaraju');
            }
        }

        return errors;
    }

    // Obrada forme
    if (orderForm) {
        orderForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(orderForm);
            const validationErrors = validateForm(formData);

            if (validationErrors.length > 0) {
                alert(validationErrors.join('\n'));
                return;
            }

            const orderData = {
                customer: {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    address: formData.get('address'),
                    city: formData.get('city'),
                    postalCode: formData.get('postalCode')
                },
                createAccount: formData.get('createAccount') === 'on',
                password: formData.get('createAccount') === 'on' ? formData.get('password') : null,
                items: cartItems,
                shipping: 5,
                total: calculateTotal()
            };

            try {
                // Ovdje bi išao API poziv za spremanje narudžbe
                console.log('Order data:', orderData);
                
                // Ako se kreira račun, ovdje bi išla registracija korisnika
                if (orderData.createAccount) {
                    // API poziv za registraciju
                    console.log('Creating account...');
                }
                
                // Očisti košaricu
                localStorage.removeItem('cartItems');
                
                // Preusmjeri na stranicu za potvrdu
                window.location.href = 'potvrda-narudzbe.html';
            } catch (error) {
                console.error('Error processing order:', error);
                alert('Došlo je do greške prilikom obrade narudžbe. Molimo pokušajte ponovno.');
            }
        });
    }

    // Helper funkcije
    function calculateTotal() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const shipping = 5;
        
        const itemsTotal = cartItems.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);
        
        return itemsTotal + shipping;
    }

    // Inicijalno renderiranje
    renderOrderSummary();

    // Provjera i redirekcija ako je košarica prazna
    if (cartItems.length === 0) {
        window.location.href = 'kosarica.html';
    }
});
