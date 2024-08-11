<?php
include('scripts/utility.php');
secure();
?>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Settings - MoonGlade CMS</title>
    <link rel="stylesheet" href="/mg/style.css" />
</head>

<body>
    <?php include('components/navbar.php'); ?>
    <main>
        <div class="modal-dashboard" id="modal"></div>
        <header>
            <h3>Settings</h3>
        </header>

        <!-- Username Update Form -->

        <form class="login-form" action="scripts/update_username.php" method="post">
            <h4>Current username: <?php echo $_SESSION['login_user']; ?></h4>
            <input class="login-input" type="text" id="username" name="username" placeholder="New username" required />
            <div class="right"><button class="save-button" type="submit">Update Username</button></div>
        </form>

        <!-- Password Change Form -->

        <form class="login-form" action="scripts/change_password.php" method="post">
            <input class="login-input" type="password" id="current_password" name="current_password" placeholder="Current password" required />
            <input class="login-input" type="password" id="new_password" name="new_password" placeholder="New password" required />
            <input class="login-input" type="password" id="confirm_password" name="confirm_password" placeholder="Repeat new password" required />

            <div class="right"><button class="save-button" type="submit">Change Password</button></div>
        </form>

        <form class="login-form" action="scripts/add_editable_section_file.php" method="post">
            <input class="login-input" type="text" id="sectionid" name="sectionid" placeholder="New section id" required />
            <div class="right"><button class="save-button" type="submit">Add editable section file</button></div>
        </form>

    </main>
    <?php include('components/footer.php'); ?>
    <script src="/mg-admin/main.js"></script>
</body>

</html>