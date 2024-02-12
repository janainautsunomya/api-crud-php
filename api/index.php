<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM users JOIN addresses ON users.id=addresses.user_id";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE users.id = :id";
            $cursor = $conn->prepare($sql);
            $cursor->bindParam(':id', $path[3]);
            $cursor->execute();
            $users = $cursor->fetch(PDO::FETCH_ASSOC);
        } else {
            $cursor = $conn->prepare($sql);
            $cursor->execute();
            $users = $cursor->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO users(id, name, phone, birth_date, cpf, rg, created_at) VALUES(null, :name, :phone, :birth_date, :cpf, :rg, :created_at)";
        $cursor = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $birth_date = date($user->birth_date);
        $cursor->bindParam(':name', $user->name);
        $cursor->bindParam(':phone', $user->phone);
        $cursor->bindParam(':birth_date', $birth_date);
        $cursor->bindParam(':cpf', $user->cpf);
        $cursor->bindParam(':rg', $user->rg);
        $cursor->bindParam(':created_at', $created_at);
    
        if($cursor->execute()) {

            $user_query = "SELECT * FROM users WHERE cpf = :cpf";
            $cursor = $conn->prepare($user_query);
            $cursor->bindParam(':cpf', $user->cpf);
            $cursor->execute();
            $user_db = $cursor->fetch(PDO::FETCH_OBJ);

            $sql_address = "INSERT INTO addresses(id, address, user_id) VALUES (null, :address, :user_id)";
            $cursor_address = $conn->prepare($sql_address);
            $cursor_address->bindParam(':address', $user->address);
            $cursor_address->bindParam(':user_id', $user_db->id);
            if ($cursor_address->execute()) {
                $response = ['status' => 201, 'message' => 'Record created successfully.'];
            }
        } else {
            $response = ['status' => 500, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE users SET name= :name, phone =:phone, birth_date =:birth_date, cpf=:cpf, rg=:rg, updated_at =:updated_at WHERE id = :id";
        $cursor = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $birth_date = date($user->birth_date);
        $cursor->bindParam(':name', $user->name);
        $cursor->bindParam(':phone', $user->phone);
        $cursor->bindParam(':birth_date', $birth_date);
        $cursor->bindParam(':cpf', $user->cpf);
        $cursor->bindParam(':rg', $user->rg);
        $cursor->bindParam(':updated_at', $updated_at);
        $cursor->bindParam(':id', $user->id);

        if($cursor->execute()) {
            $sql_address = "UPDATE addresses SET address=:address WHERE user_id = :user_id";
            $cursor_address = $conn->prepare($sql_address);
            $cursor_address->bindParam(':address', $user->address);
            $cursor_address->bindParam(':user_id', $user->user_id);
            if ($cursor_address->execute()) {
                $response = ['status' => 201, 'message' => 'Record created successfully.'];
            }
            $response = ['status' => 200, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 500, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $cursor = $conn->prepare($sql);
        $cursor->bindParam(':id', $path[3]);

        if($cursor->execute()) {
            $response = ['status' => 200, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 500, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}