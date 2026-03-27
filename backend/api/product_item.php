<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../Database.php");
require_once("../model/ProductItem.php");

$db = (new Database())->getConnection();
$item = new ProductItem($db);

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$data = json_decode(file_get_contents("php://input"), true) ?? [];


// GET ALL
// GET /api/product_item.php
if($method == "GET" && preg_match('#/api/product_item.php$#',$uri)){

    echo json_encode($item->getAll());
    exit;
}


// GET BY ID
// GET /api/product_item.php/1
if($method == "GET" && preg_match('#/api/product_item.php/([0-9]+)$#',$uri,$matches)){

    $id = $matches[1];

    echo json_encode($item->getById($id));
    exit;
}


// CREATE
// POST /api/product_item.php
if($method == "POST" && preg_match('#/api/product_item.php$#',$uri)){

    $result = $item->create(
        $data['product_id'],
        $data['serial_number']
    );

    echo json_encode(["success"=>$result]);
    exit;
}


// UPDATE
// PUT /api/product_item.php/1
if($method == "PUT" && preg_match('#/api/product_item.php/([0-9]+)$#',$uri,$matches)){

    $id = $matches[1];

    $result = $item->update(
        $id,
        $data['product_id'],
        $data['serial_number']
    );

    echo json_encode(["success"=>$result]);
    exit;
}


// UPDATE STATUS 
// PUT /api/product_item.php/status/1
if($method == "PUT" && preg_match('#/api/product_item.php/status/([0-9]+)$#',$uri,$matches)){

    $id = $matches[1];

    $result = $item->updateStatus(
        $id,
        $data['status']
    );

    echo json_encode(["success"=>$result]);
    exit;
}


// DELETE
// DELETE /api/product_item.php/1
if($method == "DELETE" && preg_match('#/api/product_item.php/([0-9]+)$#',$uri,$matches)){

    $id = $matches[1];

    $result = $item->delete($id);

    echo json_encode(["success"=>$result]);
    exit;
}