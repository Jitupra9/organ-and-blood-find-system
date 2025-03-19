<?php 

if($_REQUEST['get']){
    $username = $_POST['username'];
    $password = $_POST['password'];
    $rple = $_POST['role'];
}else{
    echo json_encode(["error" => " Invelid request"]);
}

?>