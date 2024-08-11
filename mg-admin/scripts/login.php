<?php
include('utility.php');
session_start();

if (isset($_SESSION['login_user'])) {
    header("location: /mg-admin/dashboard.php");
    die();
}

check_if_post();


$username = sanitize_input($_POST['username']);
$password = sanitize_input($_POST['password']);
$filename = __DIR__ . '\\..\\..\\mg-data\\credentials.txt';

if (!file_exists($filename)) {
    $error = "File system corrupted. No credentials file found.";
    header("location: /mg-admin/index.php?error=" . urlencode($error));
    die();
}

$userdata = explode("\n", file_get_contents($filename));
$userdata = array_map('trim', $userdata);

if ($username == $userdata[0] && password_verify($password . $userdata[2], $userdata[1])) {
    $_SESSION['login_user'] = $username;
    header("location: /mg-admin/dashboard.php");
} else {
    $error = "Your Login Name or Password is invalid.";
    header("location: /mg-admin/index.php?error=" . urlencode($error));
}
