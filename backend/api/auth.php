<?php
// 1. Headers for React Communication
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Database Connection
$host = "localhost";
$db_name = "invoice_portal";
$username = "root";
$password = ""; 

try {
    $db = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["error" => "Database Connection Failed"]);
    exit;
}

// 3. Data Processing
$action = $_GET['action'] ?? '';
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// --- LOGIN SECTION ---
if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $data['email'] ?? null;
    $pass = $data['password'] ?? null;

    $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $pass === $user['password']) {
        unset($user['password']);
        echo json_encode($user);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid email or password"]);
    }
}

// --- REGISTER SECTION ---
elseif ($action === 'register' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $data['name'] ?? null;
    $email = $data['email'] ?? null;
    $pass = $data['password'] ?? null;

    if (!$name || !$email || !$pass) {
        http_response_code(400);
        echo json_encode(["error" => "All fields are required"]);
        exit;
    }

    // Check if user already exists
    $check = $db->prepare("SELECT id FROM users WHERE email = ?");
    $check->execute([$email]);

    if ($check->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["error" => "Email is already registered"]);
    } else {
        // We provide defaults for business_name (NULL), currency (USD), and tax_rate (0)
        // This ensures the SQL INSERT doesn't fail.
        $query = "INSERT INTO users (name, email, password, business_name, currency, tax_rate, created_at) 
                  VALUES (?, ?, ?, NULL, 'USD', 0.00, NOW())";
        
        $stmt = $db->prepare($query);
        
        if ($stmt->execute([$name, $email, $pass])) {
            echo json_encode(["message" => "Success"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Registration failed in database"]);
        }
    }
}
?>