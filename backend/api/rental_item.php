<?php

class RentalItem {

    private $conn;

    public function __construct($db){
        $this->conn = $db;
    }

    // 🔹 CREATE
    public function create($rental_id,$item_id,$price,$days){

        $subtotal = $price * $days;

        $sql = "INSERT INTO rental_items
                (rental_id,item_id,price_per_day,days,subtotal)
                VALUES (:rental,:item,:price,:days,:subtotal)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":rental",$rental_id);
        $stmt->bindParam(":item",$item_id);
        $stmt->bindParam(":price",$price);
        $stmt->bindParam(":days",$days);
        $stmt->bindParam(":subtotal",$subtotal);

        return $stmt->execute();
    }

    // GET ALL (สำหรับ admin)
    public function getAll(){

        $sql = "SELECT ri.*, p.product_name FROM rental_items ri LEFT JOIN product_items pi ON ri.item_id = pi.item_id LEFT JOIN products p ON pi.product_id = p.product_id";
        $stmt = $this->conn->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // GET BY ID
    public function getById($id){
        $sql = "SELECT * FROM rental_items WHERE rental_item_id = :id";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":id",$id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // GET BY RENTAL
    public function getByRental($rental_id){
        $sql = "SELECT ri.*, p.product_name FROM rental_items ri LEFT JOIN product_items pi ON ri.item_id = pi.item_id LEFT JOIN products p ON pi.product_id = p.product_id WHERE ri.rental_id = :id";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":id",$rental_id);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // DELETE
    public function delete($id){
        $sql = "DELETE FROM rental_items WHERE rental_item_id = :id";
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindParam(":id",$id);

        return $stmt->execute();
    }
}
?>