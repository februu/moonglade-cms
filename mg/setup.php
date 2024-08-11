<?php include("..\\mg-admin\\scripts\\utility.php"); ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Log in - MoonGlade CMS</title>
    <link rel="stylesheet" href="/mg/style.css" />
</head>

<body class="center">
    <?php
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $username = sanitize_input($_POST['username']);
        $password = sanitize_input($_POST['password']);
        $confirm_password = sanitize_input($_POST['confirm_password']);
        $credentials_file = '..\\mg-data\\credentials.txt';

        // Basic validation
        if (empty($username) || empty($password) || empty($confirm_password)) {
            $error = 'All fields are required.';
        } elseif ($password !== $confirm_password) {
            $error = 'Passwords do not match.';
        } elseif (!validate_password($password)) {
            $error = 'Password needs to be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number.';
        } elseif (!validate_username($username)) {
            $error = 'Username must be between 5 and 20 characters long and can only contain letters, numbers and underscores.';
        } elseif (file_exists($credentials_file)) {
            $error = 'Credentials file already exists.';
        } else {
            // Hash the password
            $salt = bin2hex(random_bytes(22));
            $hashed_password = password_hash($password . $salt, PASSWORD_DEFAULT);

            $credentials_content = $username . "\n" . $hashed_password . "\n" . $salt;

            if (file_put_contents($credentials_file, $credentials_content)) {
                // Delete the setup.php file
                unlink(__FILE__);
                $message = "Account created successfully!";
                header("location: /mg-admin/index.php?message=" . urlencode($message));
                die();
            } else {
                $error = 'Failed to create credentials file.';
            }
        }
    }
    ?>
    <form class="login-form" action="setup.php" method="post">
        <header>
            <h3>MG Setup</h3>
        </header>
        <input class="login-input" type="text" name="username" placeholder="Username" required />
        <input class="login-input" type="password" name="password" required placeholder="Password" />
        <input class="login-input" type="password" name="confirm_password" required placeholder="Confirm password" />
        <p><small><span class="bold">Note:</span> For security reasons, this page (setup.php) will be removed after successful creation of credentials file.</small></p>
        <button class="login-button" type="submit">Create User</button>
        <?php if (!empty($error)): ?>
            <div class="modal-login modal-red" id="modal" style="display: inline-block;">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>
    </form>
    <footer>MoonGlade CMS by <a href="https://febru.me/">febru</a></footer>
</body>

</html>