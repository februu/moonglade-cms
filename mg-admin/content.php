<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌙 Content - MoonGlade</title>
    <link rel="stylesheet" href="/mg-core/style.css">
</head>

<body class="h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center">

    <?php include_once("components/navbar.php"); ?>

    <main class="flex w-full py-8 px-16 flex-col">
        <div class="mb-8">
            <h1 class="text-5xl font-bold mt-8 mb-4">Content</h1>
        </div>
        <div class="flex flex-col items-center">

            <!-- System Settings -->
            <div class="w-full flex bg-zinc-900 rounded-lg shadow-md overflow-clip min-h-64">
                <div class="bg-zinc-800 w-1/8 min-w-[200px] flex flex-col">
                    <a href="#" class="hover:bg-zinc-900 font-medium py-2 px-4 bg-zinc-800">Home</a>
                    <a href="#" class="hover:bg-zinc-900 font-medium py-2 px-4 bg-zinc-900">About</a>
                    <a href="#" class="hover:bg-zinc-900 font-medium py-2 px-4 bg-zinc-800">Services</a>
                    <a href="#" class="hover:bg-zinc-900 font-medium py-2 px-4 bg-zinc-800">Contact</a>
                </div>
                <div class="p-6 w-full">
                    <h2 class="text-3xl font-bold mb-6">Modify 'About'</h2>
                    <form method="POST">
                        <?php
                        include("components/inputs.php");
                        textbox("Title", "about_title", "About Us");
                        textbox("Subtitle", "about_subtitle", "Learn more about us");
                        textarea("Content", "about_content", 10, "We are a company that values excellence and innovation.");
                        fileDropZone("Image", "about_image", "Upload an image");
                        ?>
                        <div class="w-full flex justify-end">
                            <button type="button" class="bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-4 py-2 rounded-md cursor-pointer">
                                Save
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            </tbody>
        </div>

        </div>

        </div>
    </main>
    <?php include_once("components/footer.php"); ?>
</body>

</html>