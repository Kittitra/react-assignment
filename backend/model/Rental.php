<?php

class Rental {

    private $conn;

    public function __construct($db){
        $this->conn = $db;
    }

    // GET ALL
    public function getAll(){

        $sql = "SELECT r.rental_id,
                       c.customer_name,
                       r.rental_date,
                       r.due_date,
                       r.return_date,
                       r.total_price
                FROM rentals r
                LEFT JOIN customers c
                ON r.customer_id = c.customer_id";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // CREATE
    public function create($customer_id,$admin_id,$rental_date,$due_date){

        $sql = "INSERT INTO rentals
                (customer_id, admin_id, rental_date, due_date, total_price)
                VALUES (:customer,:admin,:rental_date,:due_date,0)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":customer",$customer_id);
        $stmt->bindParam(":admin",$admin_id);
        $stmt->bindParam(":rental_date",$rental_date);
        $stmt->bindParam(":due_date",$due_date);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }

    // UPDATE TOTAL
    public function updateTotal($id,$total){

        $sql = "UPDATE rentals SET total_price=:total WHERE rental_id=:id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":total",$total);
        $stmt->bindParam(":id",$id);

        return $stmt->execute();
    }

    // RETURN (คืนสินค้า)
    public function returnRental($id,$date){

        $sql = "UPDATE rentals 
                SET return_date = :date 
                WHERE rental_id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":date",$date);
        $stmt->bindParam(":id",$id);

        return $stmt->execute();
    }
}
?>