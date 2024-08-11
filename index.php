<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MoonGlade CMS - Welcome!</title>
    <link rel="stylesheet" href="sakura.css">
</head>

<body>
    <h1>Welcome to MoonGlade!</h1>

    <p>MoonGlade CMS is an exceptionally simple flat-file content management system (CMS) built with PHP. As my first PHP project, it's a work in progress and may not be perfect, but it effectively serves its purpose. MoonGlade CMS allows for easy modification of basic .html websites through an admin panel, all while minimizing the amount of code required for setup.</p>

    <h5>Important Links:</h5>
    <p>Project repository: <a href="https://github.com/februu/moonglade-cms">https://github.com/februu/moonglade-cms</a><br>
        Admin page: <a href="/mg-admin">/mg-admin</a>
    </p>

    <hr>

    <h3>Further Setup</h3>
    <p>You've successfully installed MoonGlade! The next step is to create an admin account and add editable sections to your static sites. Follow the steps below:</p>

    <ol>
        <li>Go to the <a target="_blank" href="/mg/setup.php">setup page</a>.</li>
        <li>Create your credentials:
            <ul>
                <li><strong>Username</strong> (5-20 characters, can include numbers, letters, and underscores).</li>
                <li><strong>Password</strong> (8-32 characters, must include at least one lowercase letter, one uppercase letter, and one number).</li>
            </ul>
        </li>
        <li>Log in to the admin panel <a target="_blank" href="/mg-admin/">here</a>.</li>
        <li>Navigate to the <strong>Settings</strong> tab and scroll to the last section on the page.</li>
        <li>Give a name to your new editable section and click <strong>Add Editable Section File</strong>.
            <br><i>Section IDs may only contain numbers, letters, and underscores.</i>
        </li>
        <li>Place your static websites in the main directory of the site and change their extensions to <code>.php</code>.</li>
        <li>Open the file where you want to include the editable section and add the following code:
            <pre><code><i>// Add this at the top of the file<br>// (pass the relative path to mg/template.php script as an argument)</i><br>include('mg/template.php');<br><br><i>// Place this where you want the editable section to appear</i><br>&lt;div&gt;&lt;?php editable('name_of_your_section'); ?&gt;&lt;/div&gt;</code></pre>
        </li>
        <li>Repeat the last three steps for each page you want to edit from the admin panel.</li>
        <li>That's it! You can now edit the contents of your pages in the <strong>Content</strong> tab in the admin panel.</li>
    </ol>
    <p style="text-align: center;"><small>Powered by <a href="https://github.com/februu/moonglade-cms">MoonGlade CMS</a>. Created by <a href="https://febru.me">febru</a>.</small></p>
</body>

</html>