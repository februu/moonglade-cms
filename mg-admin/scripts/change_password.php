<?php
include('utility.php');
session_start();
secure();
check_if_post();

$current_password = sanitize_input($_POST['current_password']);
$new_password = sanitize_input($_POST['new_password']);
$confirm_password = sanitize_input($_POST['confirm_password']);
$filename = __DIR__ . '\\..\\..\\mg-data\\credentials.txt';

$username = $_SESSION['login_user'];

if ($new_password !== $confirm_password) {
    $error = "New password and confirm password do not match.";
    header("location: /mg-admin/settings.php?error=" . urlencode($error));
    die();
}

if (!validate_password($new_password)) {
    $error = "Password needs to be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number.";
    header("location: /mg-admin/settings.php?error=" . urlencode($error));
    die();
}

if (!file_exists($filename)) {
    $error = "File system corrupted. No data file found.";
    header("location: /mg-admin/settings.php?error=" . urlencode($error));
    die();
}

$userdata = explode("\n", file_get_contents($filename));
$userdata = array_map('trim', $userdata);

// Check if the current password is correct
if ($username == $userdata[0] && password_verify($current_password . $userdata[2], $userdata[1])) {
    $new_salt = bin2hex(random_bytes(22));
    $new_hashed_password = password_hash($new_password . $new_salt, PASSWORD_DEFAULT);

    $userdata[1] = $new_hashed_password;
    $userdata[2] = $new_salt;

    file_put_contents($filename, implode("\n", $userdata));

    header("location: /mg-admin/settings.php?message=" . urlencode("Password updated successfully."));
} else {
    $error = "Your current password is incorrect.";
    header("location: /mg-admin/settings.php?error=" . urlencode($error));
}
