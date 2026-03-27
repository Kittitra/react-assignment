<?php
    header("Content-Type: application/json");

    require_once("../Database.php");
    require_once("../model/Category.php");

    $db = (new Database())->getConnection();
    $category = new Category($db);

    $method = $_SERVER['REQUEST_METHOD'];
    $uri = $_SERVER['REQUEST_URI'];

    $data = json_decode(file_get_contents("php://input"), true) ?? [];

    // GET ALL
    // GET /api/categories.php
    if($method == "GET" && preg_match('#/api/categories.php$#',$uri)){
        echo json_encode($category->getAll());
        exit;
    }


    // GET BY ID
    // GET /api/categories.php/1
    if($method == "GET" && preg_match('#/api/categories.php/([0-9]+)$#',$uri,$matches)){

        $id = $matches[1];
        $result = $category->getById($id);

        echo json_encode($result ?: ["message"=>"Not found"]);
        exit;
    }


    // CREATE
    // POST /api/categories.php
    if($method == "POST" && preg_match('#/api/categories.php$#',$uri)){

        $result = $category->create($data['category_name']);

        echo json_encode(["success"=>$result]);
        exit;
    }


    // UPDATE
    // PUT /api/categories.php/1
    if($method == "PUT" && preg_match('#/api/categories.php/([0-9]+)$#',$uri,$matches)){

        $id = $matches[1];
        $result = $category->update($id,$data['category_name']);

        echo json_encode(["success"=>$result]);
        exit;
    }


    // DELETE
    // DELETE /api/categories.php/1
    if($method == "DELETE" && preg_match('#/api/categories.php/([0-9]+)$#',$uri,$matches)){

        $id = $matches[1];
        $result = $category->delete($id);

        echo json_encode(["success"=>$result]);
        exit;
    }
?>