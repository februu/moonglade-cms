<?php
function secure()
{
    session_start();
    if (!isset($_SESSION['login_user'])) {
        header("location: /mg-admin/index.php");
        die();
    }
}

function check_if_post()
{
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("location: /mg-admin/index.php");
        die();
    }
}

function validate_username($username)
{
    return preg_match("/^[a-zA-Z0-9_]{5,20}$/", $username);
}

function validate_section_id($section_id)
{
    return preg_match("/^[a-zA-Z0-9_]{2,32}$/", $section_id);
}

function validate_password($password)
{
    if (strlen($password) < 8) {
        return false;
    }

    if (!preg_match("/[A-Z]/", $password)) {
        return false;
    }
    if (!preg_match("/[a-z]/", $password)) {
        return false;
    }
    if (!preg_match("/[0-9]/", $password)) {
        return false;
    }

    return true;
}

function sanitize_input($data)
{
    return htmlspecialchars(trim($data));
}
