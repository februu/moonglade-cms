<?php
$error_code = isset($_SERVER['REDIRECT_STATUS']) ? $_SERVER['REDIRECT_STATUS'] : '';
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Error <?php echo $error_code; ?></title>
	<link rel="stylesheet" href="/mg/style.css" />
</head>

<body class="center">
	<header>
		<h3>Error</h3>
		<h1><?php echo $error_code; ?></h1>
	</header>
	<p>Oops! Something went wrong.</p>
	<a href="javascript:history.back()">Go Back</a>
	<footer>MoonGlade CMS by <a href="https://febru.me/">febru</a></footer>
</body>

</html>