<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Simple authentication check
    if (strlen($password) < 12) {
        echo '<script>alert("Password must be at least 12 characters!");</script>';
    } else {
        echo 'Intake24{Excuse_Me_Did_You_Just_Burp_On_My_Request}';
    }
} else {
    header("Location: index.html");
    exit();
}
?>