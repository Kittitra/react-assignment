<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../Database.php");
require_once("../model/customers.php");

$db = (new Database())->getConnection();
$customer = new Customers($db);

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$data = json_decode(file_get_contents("php://input"), true) ?? [];


// Register //
// POST /api/customers.php/register //

if ($method == "POST" && preg_match('#/api/customers.php/register$#', $uri)) {
    $result = $customer->register(
        $data['customer_name'],
        $data['password'],
        $data['email'],
        $data['phone']
    );

    echo json_encode([
        "success"=>$result
    ]);

    exit;
}


// Login //
// POST /api/customers.php/login //

if ($method == "POST"&& preg_match('#/api/customers.php/login$#',$uri)){
    $user = $customer->login(
        $data['customer_name'],
        $data['password']
    );

    if($user){
        unset($customer['password']);

        echo json_encode([
            'success'=>true,
            "user"=>$user
        ]);
    }else{
        echo json_encode([
            "success"=>false,
            "message"=>"Invalid login"
        ]);
    }

    exit;
}

// CHANGE PASSWORD //
// POST /api/customers.php/change-password //

if($method == "POST" && preg_match('#/api/customers.php/change-password$#',$uri)){

    $result = $customer->changePassword(
        $data['customer_id'],
        $data['old_password'],
        $data['new_password']
    );

    echo json_encode([
        "success"=>$result
    ]);

    exit;
}

// GET CUSTOMERS //
// POST /api/customers.php/customers //

if($method == "GET" && preg_match('#/api/customers.php/customers$#',$uri)){
    echo json_encode(
        $customer->getCustomer_All()
    );

    exit;
}

// GET CUSTOMERS BY ID //
// POST /api/customers.php/customers/1 //
if($method == "GET" && preg_match('#/api/customers.php/customers/([0-9]+)$#',$uri,$matches)){

    $id = $matches[1];

    $user = $customer->getCustomer_ById($id);

    if($user){
        unset($user['password']);
        echo json_encode($user);
    }else{
        echo json_encode([
            "message"=>"Customer not found"
        ]);
    }

    exit;
}

// UPDATE CUSTOMER
// PUT /api/customers.php/update/1
if($method == "PUT" && preg_match('#/api/customers.php/update/([0-9]+)$#',$uri,$matches)){

    $id = $matches[1];

    $result = $customer->update(
        $id,
        $data['name'],
        $data['email'],
        $data['phone']
    );

    echo json_encode([
        "success"=>$result
    ]);

    exit;
}

// DELETE CUSTOMER
// DELETE /api/customers.php/delete/1=
if($method == "DELETE" && preg_match('#/api/customers.php/delete/([0-9]+)$#',$uri,$matches)){

    $id = $matches[1];

    $result = $customer->delete($id);

    echo json_encode([
        "success"=>$result
    ]);

    exit;
}
