<?php
header('Content-Type: application/json');

// Konfiguracija baze
$host = 'localhost';
$dbname = 'craftana';
$username = 'root';  // default XAMPP username
$password = '';      // default XAMPP password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Greška pri povezivanju s bazom']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Neispravan email format']);
        exit;
    }

    try {
        // Generiranje jedinstvenog koda za popust
        $kod_popusta = 'CRAFTANA' . rand(1000, 9999);
        
        $stmt = $pdo->prepare("INSERT INTO craftanakorisnici (email, kod_popusta) VALUES (?, ?)");
        $stmt->execute([$email, $kod_popusta]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Hvala na prijavi! Vaš kod za popust je: ' . $kod_popusta
        ]);
    } catch(PDOException $e) {
        if ($e->getCode() == 23000) { // Duplicate entry
            echo json_encode([
                'success' => false,
                'message' => 'Ova email adresa je već prijavljena!'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Došlo je do greške pri prijavi'
            ]);
        }
    }
}
?>