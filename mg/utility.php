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
        header("HTTP/1.1 404 Method Not Allowed");
        die();
    }
}

function validate_username($username)
{
    return preg_match("/^[a-zA-Z0-9_]{5,20}$/", $username);
}

function validate_section_id($section_id)
{
    return preg_match("/^[a-zA-Z_][a-zA-Z0-9_]{1,31}$/", $section_id);
}

function validate_password($password)
{
    if (strlen($password) < 8) {
        return false;
    }

    if (strlen($password) > 64) {
        return false;
    }

    if (trim($password) !== $password) {
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

    if (!preg_match('/[!@#$%^&*()_+\-=\[\]{};\':"\\\\|,.<>\/?~`]/', $password)) {
        return false;
    }

    return true;
}

function sanitize_input($data)
{
    return htmlspecialchars(trim($data));
}
