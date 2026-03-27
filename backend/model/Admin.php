<?php

class Admin
{

    private $conn;
    private $table = "admins";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // LOGIN
    public function login($email, $password)
    {
        $sql = "SELECT * FROM admins WHERE email = :email AND status = 'active' LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($admin && password_verify($password, $admin['password'])) {
            return $admin;
        }

        return false;
    }

    // GET ALL
    public function getAll()
    {
        $sql = "SELECT admin_id, admin_name, email, role, status, created_at
                FROM admins
                ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // GET BY ID
    public function getById($id)
    {
        $sql = "SELECT admin_id, admin_name, email, role, status, created_at
                FROM admins
                WHERE admin_id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // CREATE
    public function create($name, $email, $password, $role = 'staff')
    {
        // ตรวจสอบ email ซ้ำ
        $check = $this->conn->prepare("SELECT admin_id FROM admins WHERE email = :email");
        $check->bindParam(":email", $email);
        $check->execute();

        if ($check->fetch()) {
            return ["error" => "Email already exists"];
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO admins (admin_name, email, password, role)
                VALUES (:name, :email, :password, :role)";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $hash);
        $stmt->bindParam(":role", $role);

        return $stmt->execute();
    }

    // UPDATE
    public function update($id, $name, $email, $role)
    {
        $sql = "UPDATE admins
                SET admin_name = :name, email = :email, role = :role
                WHERE admin_id = :id";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":role", $role);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    // CHANGE PASSWORD
    public function changePassword($id, $old, $new)
    {
        $sql = "SELECT password FROM admins WHERE admin_id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) return false;

        if (!password_verify($old, $row['password'])) return false;

        $hash = password_hash($new, PASSWORD_DEFAULT);

        $sql = "UPDATE admins SET password = :password WHERE admin_id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":password", $hash);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    // DELETE (soft delete)
    public function delete($id)
    {
        $sql = "UPDATE admins SET status = 'inactive' WHERE admin_id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }
}