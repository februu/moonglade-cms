<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌙 Settings - MoonGlade</title>
    <link rel="stylesheet" href="/mg-core/style.css">
</head>

<body class="h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center">

    <?php include_once("components/navbar.php"); ?>

    <main class="flex w-full py-8 px-16 flex-col">
        <div class="mb-8">
            <h1 class="text-5xl font-bold mt-8 mb-4">Settings</h1>
        </div>
        <div class="flex flex-col items-center gap-4">

            <?php include_once("components/settings/system.php") ?>

        </div>
    </main>
    <?php include_once("components/footer.php"); ?>
</body>

</html>