<?php

function textbox($label, $id, $value = "", $required = true)
{
    $requiredAttr = $required ? 'required' : '';
    $escapedValue = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');

    echo <<<HTML
<div class="mb-4">
    <label for="{$id}" class="block text-sm font-medium text-zinc-300">{$label}</label>
    <input type="text" id="{$id}" name="{$id}" value="{$escapedValue}" class="mt-1 block w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring focus:ring-zinc-600" {$requiredAttr}>
</div>
HTML;
}

function textarea($label, $id, $rows, $value = "", $required = true)
{
    $requiredAttr = $required ? 'required' : '';
    $escapedValue = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');

    echo <<<HTML
<div class="mb-4">
    <label for="{$id}" class="block text-sm font-medium text-zinc-300">{$label}</label>
    <textarea id="{$id}" name="{$id}" rows="{$rows}" class="mt-1 block w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md focus:ring focus:ring-zinc-600" {$requiredAttr}>{$escapedValue}</textarea>
</div>
HTML;
}

function fileDropZone($label, $id, $required = true, $acceptTypes = "")
{
    $requiredAttr = $required ? 'required' : '';
    $acceptAttr = $acceptTypes ? "accept=\"{$acceptTypes}\"" : '';
    $acceptText = $acceptTypes ? "Accepted file types: {$acceptTypes}" : "All file types accepted";

    echo <<<HTML
<div class="mb-4">
    <label for="{$id}" class="block text-sm font-medium text-zinc-300">{$label}</label>
    <div class="mt-1 p-6 border-2 border-dashed border-zinc-700 rounded-md bg-zinc-800 text-center">
        <input type="file" id="{$id}" name="{$id}" class="hidden" {$requiredAttr} {$acceptAttr}>
        <label for="{$id}" class="cursor-pointer">
            <div class="flex flex-col items-center justify-center">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg>
                <p class="mt-2 text-sm text-zinc-400">Drag files here or click to upload</p>
                <p class="mt-1 text-xs text-zinc-500">{$acceptText}</p>
            </div>
        </label>
    </div>
</div>
HTML;
}
