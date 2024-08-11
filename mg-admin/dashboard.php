<?php
include('scripts/utility.php');
secure();
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
        <p>Welcome back, <?php echo $_SESSION['login_user']; ?>! <br>You are running MoonGlade version 1.0. <br>Latest available version:
            <?php
            $url = 'https://gist.githubusercontent.com/februu/5954a8604ff51c4ab39208089b4a9351/raw/e34845ba15b5d16bbe7a5e449e34349949e6ee67/version.txt';
            $content = file_get_contents($url);

            // Check if the content was successfully retrieved
            if ($content !== false) {
                echo nl2br(htmlspecialchars($content));
            } else {
                echo "Failed to retrieve version information.";
            }
            ?>. <br> More info here: <a href="https://github.com/februu/moonglade-cms">https://github.com/februu/moonglade-cms</a>
        </p>
    </main>
    <?php include('components/footer.php'); ?>
</body>

</html>