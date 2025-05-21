<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌙 Dashboard - MoonGlade</title>
    <link rel="stylesheet" href="/mg/style.css">
</head>

<body class="h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center">

    <?php include_once("components/navbar.php"); ?>

    <main class="flex w-full py-8 px-16 flex-col">
        <div class="mb-8">
            <h1 class="text-5xl font-bold mt-8 mb-4">Dashboard</h1>
            <p class="text-lg mb-8">Welcome back, <span class="font-semibold text-emerald-400">Admin</span>!</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <?php
            $widgetsDir = 'widgets/';
            $widgetFiles = glob($widgetsDir . '*.php');

            foreach ($widgetFiles as $widget) {
                include_once($widget);
            }
            ?>

        </div>
    </main>
    <?php include_once("components/footer.php"); ?>
</body>

</html>