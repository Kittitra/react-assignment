<?php
header("Content-Type: application/json");

require_once("../Database.php");
require_once("../model/RentalItem.php");

$db = (new Database())->getConnection();
$item = new RentalItem($db);

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];


// GET ALL
if($method == "GET" && preg_match('#/api/rental_item.php$#',$uri)){
    echo json_encode($item->getAll());
    exit;
}


// GET BY ID
if($method == "GET" && preg_match('#/api/rental_item.php/([0-9]+)$#',$uri,$m)){
    echo json_encode($item->getById($m[1]));
    exit;
}


// GET BY RENTAL สำคัญ
if($method == "GET" && preg_match('#/api/rental_item.php/rental/([0-9]+)$#',$uri,$m)){
    echo json_encode($item->getByRental($m[1]));
    exit;
}


// DELETE
if($method == "DELETE" && preg_match('#/api/rental_item.php/([0-9]+)$#',$uri,$m)){

    $result = $item->delete($m[1]);

    echo json_encode(["success"=>$result]);
    exit;
}