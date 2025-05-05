<?php
include( $_SERVER['DOCUMENT_ROOT'] . "/mg/utility.php");
secure();

$current_version = '2.0.0';
$latest_version = 'unknown';

# Get the latest version from GitHub API
$url = 'https://api.github.com/repos/februu/moonglade-cms/releases/latest';
$options = [
    "http" => [
        "header" => "User-Agent: PHP"
    ]
];
$context = stream_context_create($options);
$content = file_get_contents($url, false, $context);
if ($content !== false) {
    $json_data = json_decode($content, true);
    if (isset($json_data['name'])) {
       $latest_version = htmlspecialchars($json_data['name']);
    }
}
?>

<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard - MoonGlade CMS</title>
    <link rel="stylesheet" href="/mg/style.css" />
</head>

<body>
    <?php include('components/navbar.php'); ?>
    <main>
        <header>
            <h3>Dashboard</h3>
        </header>
        <p>Welcome back, <?php echo $_SESSION['login_user']; ?>! <br>You are running MoonGlade version <?php echo $current_version ?>. <br>Latest available version: <?php echo $latest_version ?>. <br> More info here: <a href="https://github.com/februu/moonglade-cms">https://github.com/februu/moonglade-cms</a>
        </p>
    </main>
    <?php include('components/footer.php'); ?>
</body>

</html>