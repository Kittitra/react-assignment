<?php

class Product
{

    private $conn;
    private $table = "products";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // 🔹 GET ALL (JOIN CATEGORY)
    public function getAll()
    {

        $sql = "SELECT 
    p.product_id, 
    p.product_name,
    p.description,
    p.rental_price_per_day,
    p.image,
    c.category_name
FROM products p
LEFT JOIN categories c 
ON p.category_id = c.category_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // 🔹 GET BY ID
    public function getById($id)
    {

        $sql = "SELECT * FROM products WHERE product_id = :id";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":id", $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // CREATE
    public function create($name, $category, $price, $description, $image = null) {
    $sql = "INSERT INTO products 
        (product_name, category_id, description, rental_price_per_day, image)
        VALUES (:name, :category, :description, :price, :image)";

    $stmt = $this->conn->prepare($sql);

    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":category", $category);
    $stmt->bindParam(":description", $description);
    $stmt->bindParam(":price", $price);
    $stmt->bindParam(":image", $image);

    return $stmt->execute();
}

    // UPDATE
    public function update($id, $name, $description, $category, $price, $image = null)
    {
        $sql = "UPDATE products 
        SET product_name = :name,
            category_id = :category,
            description = :description,
            rental_price_per_day = :price,
            image = :image
        WHERE product_id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":category", $category);
        $stmt->bindParam(":price", $price);
        $stmt->bindParam(":image", $image);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    // DELETE
    public function delete($id)
    {

        $sql = "DELETE FROM products WHERE product_id = :id";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }
}
