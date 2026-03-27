<?php

class Category
{

    private $conn;
    private $table = "categories";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // GET ALL
    public function getAll()
    {
        $sql = "SELECT category_id, category_name FROM categories";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // GET BY ID
    public function getById($id)
    {
        $sql = "SELECT category_id, category_name FROM categories WHERE category_id = :id";
        $stmt = $this->conn->prepare($sql);
        
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // CREATE
    public function create($name)
    {
        $sql = "INSERT INTO categories (category_name) VALUES (:name)";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":name", $name);

        return $stmt->execute();
    }

    // UPDATE
    public function update($id, $name)
    {
        $sql = "UPDATE categories SET category_name = :name WHERE category_id = :id";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    // DELETE
    public function delete($id)
    {
        $sql = "DELETE FROM categories WHERE category_id = :id";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }
}
