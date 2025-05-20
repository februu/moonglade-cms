<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌙 Login - MoonGlade</title>
    <link rel="stylesheet" href="/mg/style.css">
</head>

<body class="h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center">
    <div class="w-full max-w-sm p-6 bg-zinc-900 rounded-lg shadow-md">
        <header class="mb-4">
            <h3 class="text-center text-2xl font-bold">Login</h3>
        </header>
        <form action="/mg-admin/login.php" method="POST" class="flex flex-col gap-4">
            <input type="text" name="username" placeholder="Username" required class="p-2 bg-zinc-800 rounded-md">
            <input type="password" name="password" placeholder="Password" required class="p-2 bg-zinc-800 rounded-md">
            <button type="submit" class="p-2 bg-fuchsia-700 rounded-md hover:bg-fuchsia-800 transition cursor-pointer">Login</button>
        </form>
    </div>
</body>

</html>