<!-- MoonGlade Version Check Widget -->
<?php

// Fetch data from GitHub API
$url = 'https://api.github.com/repos/februu/moonglade-cms/releases';
$tag_name = '?.?.?';
$api_success = false;

// Create context with User-Agent header
$context = stream_context_create([
    'http' => [
        'header' => 'User-Agent: request'
    ]
]);

$response = file_get_contents($url, false, $context);
if ($response !== FALSE) {
    $releases = json_decode($response, true);
    if (json_last_error() === JSON_ERROR_NONE && !empty($releases)) {
        $tag_name = $releases[0]['tag_name'];
        $api_success = true;
    }
}
?>
<div class="w-full p-6 bg-zinc-900 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">System Information</h2>
    <div class="flex justify-between items-center p-3 bg-zinc-800 rounded mb-2">
        <span>Current Version</span>
        <span class="font-mono bg-zinc-700 px-2 py-1 rounded text-emerald-400">2.0.0</span>
    </div>
    <div class="flex justify-between items-center p-3 bg-zinc-800 rounded mb-2">
        <span>Latest Available</span>
        <span class="font-mono bg-zinc-700 px-2 py-1 rounded text-emerald-400"><?php echo $api_success ? $tag_name : 'Error'; ?></span>
    </div>
</div>