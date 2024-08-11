<?php
include('scripts/utility.php');
secure();


function get_content($path)
{
    $filename = '..\\mg-data\\content\\' . $path . '.txt';
    if (file_exists($filename)) {
        $content = file_get_contents($filename);
        return $content;
    } else {
        return '';
    }
}

?>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content - MoonGlade CMS</title>
    <link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet" />
    <link rel="stylesheet" href="/mg/style.css" />
</head>

<body>
    <?php include('components/navbar.php'); ?>
    <main>
        <div class="modal-dashboard" id="modal"></div>
        <header>
            <h3>Content</h3>
        </header>
        <?php
        $directory = '..\\mg-data\\content';
        $sections = glob($directory . '\\*.txt');
        $sections = array_map(function ($file) {
            return pathinfo($file, PATHINFO_FILENAME);
        }, $sections);
        foreach ($sections as $section) {
            echo '<form id="' . htmlspecialchars($section) . '" action="scripts/update_content.php" method="post">
        <p>' . htmlspecialchars($section) . '</p>
        <div id="' . htmlspecialchars($section) . '-editor" class="editor"></div>
        <input type="hidden" name="' . htmlspecialchars($section) . '-content" id="' . htmlspecialchars($section) . '-content" />
        <div class="right"><button class="save-button" type="submit">Save</button></div>
        </form>';
        }
        ?>

    </main>
    <div class="modal" id="modal"></div>
    <?php include('components/footer.php'); ?>

    <script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script>
    <script>
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image'],
            [{
                'list': 'ordered'
            }, {
                'list': 'bullet'
            }],
            [{
                'script': 'sub'
            }, {
                'script': 'super'
            }],
            [{
                'indent': '-1'
            }, {
                'indent': '+1'
            }],
            [{
                'size': ['small', false, 'large', 'huge']
            }],
            [{
                'header': [1, 2, 3, 4, 5, 6, false]
            }],
            [{
                'color': []
            }, {
                'background': []
            }],
            [{
                'align': []
            }],
            ['clean']
        ];

        <?php
        foreach ($sections as $section) {
            echo "const quill_" . htmlspecialchars($section) . " = new Quill('#" . htmlspecialchars($section) . "-editor', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });
        quill_" . htmlspecialchars($section) . ".root.innerHTML = '" . str_replace(array("\r", "\n"), '', get_content($section)) . "';
        const form_" . htmlspecialchars($section) . " = document.getElementById('" . htmlspecialchars($section) . "');
        form_" . htmlspecialchars($section) . ".addEventListener('submit', (event) => {
            event.preventDefault();
            document.getElementById('" . htmlspecialchars($section) . "-content').value = JSON.stringify(quill_" . htmlspecialchars($section) . ".root.innerHTML);
            form_" . htmlspecialchars($section) . ".submit();
        });
        ";
        }
        ?>
    </script>
    <script src="/mg-admin/main.js"></script>
</body>

</html>