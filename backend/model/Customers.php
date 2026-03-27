<?php

class Customers
{

    private $conn;
    private $table = "customers";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function register($name, $password, $email, $phone)
    {

        $hash = password_hash($password, PASSWORD_DEFAULT);

        $check = $this->conn->prepare("SELECT customer_id FROM customers WHERE email=:email");
        $check->bindParam(":email", $email);
        $check->execute();

        if ($check->fetch()) {
            return ["error" => "Email already exists"];
        }

        $sql = "INSERT INTO customers
                    (customer_name,password,email,phone,register_date)
                    VALUES (:name,:password,:email,:phone,CURDATE())";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":password", $hash);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":phone", $phone);

        return $stmt->execute();
    }

    // LOGIN
    public function login($email, $password)
    {

        $sql = "SELECT * FROM customers WHERE email=:email LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            return $user;
        }

        return false;
    }

    // CHANGE PASSWORD //
    public function changePassword($id, $old, $new)
    {
        $sql = "SELECT password FROM customers WHERE customer_id=:id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) return false;

        if (!password_verify($old, $row['password'])) return false;

        $hash = password_hash($new, PASSWORD_DEFAULT);

        $sql = "UPDATE customers SET password=:password WHERE customer_id=:id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":password", $hash);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    public function getCustomer_All()
    {
        $sql = "SELECT customer_id , customer_name , email , phone , register_date FROM customers WHERE status='active'";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $customers;
    }

    public function getCustomer_ById($customerId)
    {
        $sql = "SELECT customer_id , customer_name , email , phone , register_date FROM customers WHERE customer_id=: status='active'";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":customerId", $customerId);

        $stmt->execute();
        $customer = $stmt->fetch(PDO::FETCH_ASSOC);
        return $customer;
    }

    // UPDATE
    public function update($id, $name, $email, $phone)
    {
        $sql = "UPDATE customers SET customer_name=:name,email=:email,phone=:phone WHERE customer_id=:id";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":phone", $phone);

        return $stmt->execute();
    }

    // DELETE
    public function delete($id)
    {
        $sql = "UPDATE customers SET status='inactive' WHERE customer_id=:id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":id", $id);
        return $stmt->execute();
    }

}
