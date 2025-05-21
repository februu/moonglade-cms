### Xampp

I use xampp for local development. You can add this to your apache server configuration for easier dev process.

```conf
# .../xampp/apache/conf/httpd.conf

Listen 80
Listen 8081     # Add this line
```

```conf
# .../xampp/apache/conf/extra/httpd-vhosts.conf

<VirtualHost *:8081>
    DocumentRoot ".../moonglade"
    <Directory ".../moonglade">
        Options +Indexes
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### Live Server Web Extension

Useful with Live Server for VS Code.

### Tailwind

For styling I'm using my favourite solution: Tailwind CSS. To use it, you need to download the CLI version (you can find the link below in the **Creating a release** section). Then you can run the command provided below:

```sh
tailwindcss -i ./mg/tailwind.css -o ./mg/style.css --watch
```

### Creating a release

To create a release you will need two things:

- Tailwind CLI: [https://github.com/tailwindlabs/tailwindcss/releases](https://github.com/tailwindlabs/tailwindcss/releases)
- Python 3.x

Download the Taliwind CLI and provie the correct path to it in the settings section of the [`build.py`](../build.py). Change other settings to your liking and run the script. A new zip file with all necessary files will be created.
