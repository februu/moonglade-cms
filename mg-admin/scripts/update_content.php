<?php
include('utility.php');
session_start();
secure();
check_if_post();

$path = __DIR__ . '\\..\\..\\mg-data\\content\\*.txt';
$existingFiles = glob($path);

foreach ($_POST as $key => $value) {
    $filename = __DIR__ . '\\..\\..\\mg-data\\content\\' . str_replace('-content', '', $key) . '.txt';

    if (in_array($filename, $existingFiles)) {
        $processedContent = nl2br($value); // Convert newlines to <br> tags.
        if (strlen($processedContent) >= 2) {
            $processedContent = substr($processedContent, 1, -1); // Remove the quotes.
        }
        if (file_put_contents($filename, $processedContent) !== false) {
            header('Location: /mg-admin/content.php?message=' . urlencode('Updated successfully.'));
        } else {
            header('Location: /mg-admin/content.php?error=' . urlencode('An error occurred.'));
        }
    } else {
        header('Location: /mg-admin/content.php?error=' . urlencode('No matching file found.'));
    }
}
