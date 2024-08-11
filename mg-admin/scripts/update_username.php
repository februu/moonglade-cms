<?php
include('utility.php');
session_start();
secure();
check_if_post();

$new_username = $_POST['username'];
$filename = __DIR__ . '\\..\\..\\mg-data\\credentials.txt';

if (!validate_username($new_username)) {
    $error = "Username must be between 5 and 20 characters long and can only contain letters, numbers and underscores.";
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
$userdata[0] = $new_username;
file_put_contents($filename, implode("\n", $userdata));
header("location: /mg-admin/settings.php?message=" . urlencode("Username updated successfully."));
$_SESSION['login_user'] = $new_username;
