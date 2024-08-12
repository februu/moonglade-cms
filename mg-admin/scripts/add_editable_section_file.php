<?php
include('utility.php');
session_start();
secure();
check_if_post();

$section_id = sanitize_input($_POST['sectionid']);
if (!validate_section_id($section_id)) {
    header('Location: /mg-admin/settings.php?error=' . urlencode('Section id can only contain letters, numbers, and underscores.'));
    die();
}
$path = __DIR__ . '\\..\\..\\mg-data\\content\\';;
$file = fopen($path . $section_id . '.txt', 'w');
fclose($file);
header('Location: /mg-admin/settings.php?message=' . urlencode('Created section file successfully.'));
