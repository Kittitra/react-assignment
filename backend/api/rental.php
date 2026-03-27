<?php
header("Content-Type: application/json");

require_once("../Database.php");
require_once("../model/Rental.php");
require_once("../model/RentalItem.php");
require_once("../model/ProductItem.php");

$db = (new Database())->getConnection();

$rental = new Rental($db);
$rentalItem = new RentalItem($db);
$productItem = new ProductItem($db);

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$data = json_decode(file_get_contents("php://input"), true) ?? [];


// GET ALL RENTALS
if($method == "GET" && preg_match('#/api/rental.php$#',$uri)){
    echo json_encode($rental->getAll());
    exit;
}


// GET ITEMS IN RENTAL
// GET /api/rental.php/items/1
if($method == "GET" && preg_match('#/api/rental.php/items/([0-9]+)$#',$uri,$m)){

    echo json_encode($rentalItem->getByRental($m[1]));
    exit;
}


// CREATE RENTAL
if($method == "POST" && preg_match('#/api/rental.php$#',$uri)){

    //  validate
    if(empty($data['items'])){
        echo json_encode(["success"=>false,"message"=>"No items"]);
        exit;
    }

    $rental_id = $rental->create(
        $data['customer_id'],
        $data['admin_id'],
        $data['rental_date'],
        $data['due_date']
    );

    $total = 0;

    foreach($data['items'] as $item){

        $subtotal = $item['price_per_day'] * $item['days'];
        $total += $subtotal;

        // create rental item
        $rentalItem->create(
            $rental_id,
            $item['item_id'],
            $item['price_per_day'],
            $item['days']
        );

        // update status
        $productItem->updateStatus($item['item_id'],"rented");
    }

    // update total
    $rental->updateTotal($rental_id,$total);

    echo json_encode([
        "success"=>true,
        "rental_id"=>$rental_id,
        "total"=>$total
    ]);

    exit;
}


// RETURN RENTAL 
// PUT /api/rental.php/return/1
if($method == "PUT" && preg_match('#/api/rental.php/return/([0-9]+)$#',$uri,$m)){
    $rental_id = $m[1];
    // ดึง item ทั้งหมด
    $items = $rentalItem->getByRental($rental_id);

    foreach($items as $i){ 
        $productItem->updateStatus($i['item_id'],"available");
    }

    $result = $rental->returnRental($rental_id,date("Y-m-d"));

    echo json_encode(["success"=>$result]);

    exit;
}