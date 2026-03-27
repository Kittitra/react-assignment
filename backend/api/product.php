<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


require_once("../Database.php");
require_once("../model/Product.php");

$db = (new Database())->getConnection();
$product = new Product($db);


$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$data = json_decode(file_get_contents("php://input"), true) ?? [];


// =============================
// GET ALL
// GET /api/product.php
// =============================
if($method == "GET" && preg_match('#/api/product.php$#',$uri)){

    echo json_encode($product->getAll());
    exit;
}


// =============================
// GET BY ID
// GET /api/product.php/1
// =============================
if($method == "GET" && preg_match('#/api/product.php/([0-9]+)$#',$uri,$matches)){

    $id = $matches[1];

    $result = $product->getById($id);

    echo json_encode($result ?: ["message"=>"Product not found"]);
    exit;
}


// =============================
// CREATE
// POST /api/product.php
// =============================
if($method == "POST" && preg_match('#/api/product.php$#',$uri)){

    $result = $product->create(
        $data['product_name'],
        $data['description'],
        $data['category_id'],
        $data['rental_price_per_day'],
        $data['image_url'] ?? null
    );

    echo json_encode(["success"=>$result]);
    exit;
}


// =============================
// UPDATE
// PUT /api/product.php/1
// =============================
if($method == "PUT" && preg_match('#/api/product.php/([0-9]+)$#',$uri,$matches)){

    $id = $matches[1];

    $result = $product->update(
        $id,
        $data['product_name'],
        $data['description'],
        $data['category_id'],
        $data['rental_price_per_day'],
        $data['image_url'] ?? null
    );

    echo json_encode(["success"=>$result]);
    exit;
}


// =============================
// DELETE
// DELETE /api/product.php/1
// =============================
if($method == "DELETE" && preg_match('#/api/product.php/([0-9]+)$#',$uri,$matches)){

    $id = $matches[1];

    $result = $product->delete($id);

    echo json_encode(["success"=>$result]);
    exit;
}