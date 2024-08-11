<?php

function editable($path)
{
    $filename = __DIR__ . '..\\mg-data\\content\\' . $path . '.txt';
    if (file_exists($filename)) {
        $content = file_get_contents($filename);
        echo $content;
    } else {
        echo '';
    }
}
