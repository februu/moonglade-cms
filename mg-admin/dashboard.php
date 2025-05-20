<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌙 Login - MoonGlade</title>
    <link rel="stylesheet" href="/mg/style.css">
</head>

<body class="h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center">
    <nav class="w-full p-8 bg-zinc-900 shadow-md">
        <a href="#">item1</a>
        <a href="#">item2</a>
        <a href="#">item3</a>
    </nav>
    <main class="flex w-full py-8 px-16 flex-col">
        <h1 class="text-5xl font-bold mt-8 mb-4">Dashboard</h1>
        <div class="mb-16">
            <p class="text-lg mb-4">Welcome back, <span class="font-semibold text-emerald-400">Admin</span>!</p>
            <div>
                <?php include_once("widgets/mginfo.php"); ?>
            </div>

        </div>
    </main>

</body>

</html>