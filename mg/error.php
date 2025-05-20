<?php
$error_code = isset($_SERVER['REDIRECT_STATUS']) ? $_SERVER['REDIRECT_STATUS'] : '';
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Error <?php echo $error_code; ?></title>
</head>

<body>
	<header>
		<h3>Error</h3>
		<h1><?php echo $error_code; ?></h1>
	</header>
	<p>Oops! Something went wrong.</p>
	<a href="javascript:history.back()">Go Back</a>
</body>

</html>