<?php

class ProductItem {

    private $conn;
    private $table = "product_items";

    public function __construct($db){
        $this->conn = $db;
    }

    // 🔹 GET ALL (JOIN PRODUCT)
    public function getAll(){

        $sql = "SELECT pi.item_id,
                       pi.serial_number,
                       pi.status,
                       p.product_name
                FROM product_items pi
                LEFT JOIN products p
                ON pi.product_id = p.product_id";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // 🔹 GET BY ID
    public function getById($id){

        $sql = "SELECT * FROM product_items WHERE item_id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id",$id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // 🔹 CREATE
    public function create($product_id,$serial){

        $sql = "INSERT INTO product_items
                (product_id, serial_number, status)
                VALUES (:product_id, :serial, 'available')";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":product_id",$product_id);
        $stmt->bindParam(":serial",$serial);

        return $stmt->execute();
    }

    // 🔹 UPDATE
    public function update($id,$product_id,$serial){

        $sql = "UPDATE product_items
                SET product_id = :product_id,
                    serial_number = :serial
                WHERE item_id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":product_id",$product_id);
        $stmt->bindParam(":serial",$serial);
        $stmt->bindParam(":id",$id);

        return $stmt->execute();
    }

    // 🔹 UPDATE STATUS (สำคัญมาก 🔥)
    public function updateStatus($id,$status){

        $sql = "UPDATE product_items
                SET status = :status
                WHERE item_id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":status",$status);
        $stmt->bindParam(":id",$id);

        return $stmt->execute();
    }

    // 🔹 DELETE
    public function delete($id){

        $sql = "DELETE FROM product_items WHERE item_id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id",$id);

        return $stmt->execute();
    }
}
?>