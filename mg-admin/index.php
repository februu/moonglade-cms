<?php
session_start();
if (isset($_SESSION['login-user'])) {
	header("location: dashboard.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Log in - MoonGlade CMS</title>
	<link rel="stylesheet" href="/mg/style.css" />
</head>

<body class="center">
	<form class="login-form" action="scripts/login.php" method="post">
		<header>
			<h3>MoonGlade 🌙</h3>
		</header>
		<input class="login-input" type="text" name="username" placeholder="Username" required />
		<input class="login-input" type="password" name="password" required placeholder="Password" />
		<button class="login-button" type="submit">Log in</button>
	</form>
	<div class="modal-login" id="modal"></div>
	<footer>MoonGlade CMS by <a href="https://febru.me/">febru</a></footer>

	<script src="/mg-admin/main.js"></script>
</body>

</html>