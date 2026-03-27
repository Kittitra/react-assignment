<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../Database.php");
require_once("../model/Admin.php");

$db = (new Database())->getConnection();
$admin = new Admin($db);

$method = $_SERVER['REQUEST_METHOD'];
$uri    = $_SERVER['REQUEST_URI'];

$data = json_decode(file_get_contents("php://input"), true) ?? [];


// =============================
// LOGIN
// POST /api/admin.php/login
// Body: { "email": "", "password": "" }
// =============================
if ($method == "POST" && preg_match('#/api/admin.php/login$#', $uri)) {

    $result = $admin->login(
        $data['email'],
        $data['password']
    );

    if ($result) {
        unset($result['password']);
        echo json_encode([
            "success" => true,
            "admin"   => $result
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Invalid email or password"
        ]);
    }

    exit;
}


// =============================
// GET ALL
// GET /api/admin.php
// =============================
if ($method == "GET" && preg_match('#/api/admin.php$#', $uri)) {

    echo json_encode($admin->getAll());
    exit;
}


// =============================
// GET BY ID
// GET /api/admin.php/1
// =============================
if ($method == "GET" && preg_match('#/api/admin.php/([0-9]+)$#', $uri, $matches)) {

    $id     = $matches[1];
    $result = $admin->getById($id);

    echo json_encode($result ?: ["message" => "Admin not found"]);
    exit;
}


// =============================
// CREATE
// POST /api/admin.php
// Body: { "admin_name": "", "email": "", "password": "", "role": "staff"|"superadmin" }
// =============================
if ($method == "POST" && preg_match('#/api/admin.php$#', $uri)) {

    $result = $admin->create(
        $data['admin_name'],
        $data['email'],
        $data['password'],
        $data['role'] ?? 'staff'
    );

    echo json_encode(["success" => $result]);
    exit;
}


// =============================
// UPDATE
// PUT /api/admin.php/1
// Body: { "admin_name": "", "email": "", "role": "" }
// =============================
if ($method == "PUT" && preg_match('#/api/admin.php/([0-9]+)$#', $uri, $matches)) {

    $id = $matches[1];

    $result = $admin->update(
        $id,
        $data['admin_name'],
        $data['email'],
        $data['role']
    );

    echo json_encode(["success" => $result]);
    exit;
}


// =============================
// CHANGE PASSWORD
// PUT /api/admin.php/change-password/1
// Body: { "old_password": "", "new_password": "" }
// =============================
if ($method == "PUT" && preg_match('#/api/admin.php/change-password/([0-9]+)$#', $uri, $matches)) {

    $id = $matches[1];

    $result = $admin->changePassword(
        $id,
        $data['old_password'],
        $data['new_password']
    );

    echo json_encode(["success" => $result]);
    exit;
}


// =============================
// DELETE
// DELETE /api/admin.php/1
// =============================
if ($method == "DELETE" && preg_match('#/api/admin.php/([0-9]+)$#', $uri, $matches)) {

    $id = $matches[1];

    $result = $admin->delete($id);

    echo json_encode(["success" => $result]);
    exit;
}