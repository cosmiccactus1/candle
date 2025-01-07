<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Generiranje broja narudžbe
    $orderNumber = 'CRA' . date('Ymd') . rand(1000, 9999);
    
    // Email za kupca - HTML verzija
    $to = $data['customerInfo']['email'];
    $subject = "Vaša narudžba #" . $orderNumber . " - Crafthana";
    
    $customerMessage = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .products { margin: 20px 0; }
            .product { padding: 10px 0; border-bottom: 1px solid #eee; }
            .total { font-weight: bold; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Hvala na vašoj narudžbi!</h2>
                <p>Broj narudžbe: " . $orderNumber . "</p>
            </div>
            
            <div class='details'>
                <p>Poštovani/a " . $data['customerInfo']['firstName'] . ",</p>
                <p>Vaša narudžba je uspješno zaprimljena.</p>
                
                <h3>Adresa za dostavu:</h3>
                <p>" . $data['customerInfo']['address'] . "<br>
                " . $data['customerInfo']['city'] . " " . $data['customerInfo']['postalCode'] . "</p>
                
                <div class='products'>
                    <h3>Naručeni proizvodi:</h3>";
                    
                    foreach ($data['items'] as $item) {
                        $customerMessage .= "
                        <div class='product'>
                            " . $item['name'] . " x " . $item['quantity'] . " = " . $item['price'] . " BAM
                        </div>";
                    }
                    
    $customerMessage .= "
                </div>
                
                <div class='total'>
                    Ukupno za platiti: " . $data['total'] . "
                </div>
            </div>
            
            <div class='footer'>
                <p>Za sva pitanja kontaktirajte nas na email: info@crafthana.xyz</p>
                <p>© 2025 Crafthana</p>
            </div>
        </div>
    </body>
    </html>";

    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: Crafthana <info@crafthana.xyz>' . "\r\n";

    // Slanje emaila kupcu
    mail($to, $subject, $customerMessage, $headers);

    // Email za vas (info@crafthana.xyz)
    $adminMessage = "
    <html>
    <body>
        <h2>Nova narudžba #" . $orderNumber . "</h2>
        <h3>Podaci o kupcu:</h3>
        <p>
            Ime i prezime: " . $data['customerInfo']['firstName'] . " " . $data['customerInfo']['lastName'] . "<br>
            Email: " . $data['customerInfo']['email'] . "<br>
            Telefon: " . $data['customerInfo']['phone'] . "<br>
            Adresa: " . $data['customerInfo']['address'] . "<br>
            Grad: " . $data['customerInfo']['city'] . "<br>
            Poštanski broj: " . $data['customerInfo']['postalCode'] . "
        </p>
        
        <h3>Naručeni proizvodi:</h3>";
        
    foreach ($data['items'] as $item) {
        $adminMessage .= "<p>" . $item['name'] . " x " . $item['quantity'] . " = " . $item['price'] . " BAM</p>";
    }
    
    $adminMessage .= "
        <h3>Ukupno: " . $data['total'] . "</h3>
    </body>
    </html>";

    mail('info@crafthana.xyz', 'Nova narudžba #' . $orderNumber, $adminMessage, $headers);

    // Vraćamo odgovor JavaScriptu
    echo json_encode([
        'success' => true,
        'orderNumber' => $orderNumber,
        'message' => 'Narudžba je uspješno zaprimljena'
    ]);
}
?>
