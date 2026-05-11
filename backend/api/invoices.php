<?php
// 1. Headers for Security & CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Database Config
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

$method = $_SERVER['REQUEST_METHOD'];

// --- ACTIONS ---

// GET: Fetch all invoices for a user
if ($method === 'GET') {
    $user_id = $_GET['user_id'] ?? 1;
    $stmt = $db->prepare("SELECT * FROM invoices WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

// POST: Create a new invoice
elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    if(!empty($data->client_name) && !empty($data->amount)) {
        $query = "INSERT INTO invoices (user_id, client_name, total, status, due_date) VALUES (?, ?, ?, 'pending', ?)";
        $stmt = $db->prepare($query);
        $stmt->execute([$data->user_id ?? 1, $data->client_name, $data->amount, $data->due_date]);
        echo json_encode(["message" => "Invoice Created"]);
    }
}

// PUT: Update Status (Toggle Paid/Pending)
elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));
    if(!empty($data->id) && !empty($data->status)) {
        $stmt = $db->prepare("UPDATE invoices SET status = ? WHERE id = ?");
        $stmt->execute([$data->status, $data->id]);
        echo json_encode(["message" => "Status Updated"]);
    }
}

// DELETE: Remove an invoice
elseif ($method === 'DELETE') {
    if(!empty($_GET['id'])) {
        $stmt = $db->prepare("DELETE FROM invoices WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        echo json_encode(["message" => "Invoice Deleted"]);
    }
}
?>