<?php
$error_code = isset($_SERVER['REDIRECT_STATUS']) ? $_SERVER['REDIRECT_STATUS'] : '';
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Error <?php echo $error_code; ?></title>
	<link rel="stylesheet" href="/mg/style.css">
</head>

<body class="h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center text-center">
	<header class="mb-6">
		<h3 class="text-3xl">Error</h3>
		<h1 class="text-5xl"><?php echo $error_code ?: '404'; ?></h1>
	</header>
	<p class="mb-4">Oops! Something went wrong.</p>
	<a class="font-bold underline hover:text-zinc-400" href="javascript:history.back()">Go Back</a>
</body>

</html>