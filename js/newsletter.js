// Newsletter form handling
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
            alert(data.message); // Prikazuje grešku ako email već postoji
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Došlo je do greške pri prijavi na newsletter');
    });
});

// Modal close handlers
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('newsletter-modal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('newsletter-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
