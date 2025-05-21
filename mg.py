#!/usr/bin/python3
# MG CMS Build Script

import zipfile
import os
import subprocess

### Settings ###

items = [".htaccess", "index.php", "mg-admin", "mg"]
tailwind_path = "tailwindcss"
version = "2.0.0"

################

# TODO: Add function to update the version number in cms files

def zip_items(item_list, output_zip):
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for item in item_list:
            if os.path.isfile(item):
                zipf.write(item, arcname=os.path.basename(item))
            elif os.path.isdir(item):
                for root, _, files in os.walk(item):
                    for file in files:
                        full_path = os.path.join(root, file)
                        arcname = os.path.relpath(full_path, start=os.path.dirname(item))
                        zipf.write(full_path, arcname=arcname)

def build_release():
    print("\033[92mBuilding release...\033[0m")
    try:
        result = subprocess.run([tailwind_path, "-i", "tailwind.css", "-o", "./mg/style.css", "--minify" ], capture_output=True, text=True)
        if not result.returncode == 0:
            print("\033[91mTailwind CSS build failed.\033[0m")
            print(result.stderr.strip().splitlines()[-1])
            exit(1)
    except (subprocess.SubprocessError, FileNotFoundError):
        print("\033[91mTailwind CSS not found. Please install it or add it to PATH first.\033[0m")
        exit(1)
   
    print("\033[92mTailwind CSS build completed successfully. Zipping...\033[0m")
    os.makedirs("release", exist_ok=True)
    zip_items(items, f"release/moonglade-{version}.zip")
    print(f"\033[92mZipping completed successfully. (\033[0m ./release/moonglade-{version}.zip \033[92m)\033[0m")

if __name__ == "__main__":
    print("\033[96mWelcome to MoonGlade CMS Dev Script 🌙\033[0m")

    if len(os.sys.argv) > 1:
        if os.sys.argv[1] == "--dev":
            print("\033[96mRunning Tailwind CSS in dev mode...\033[0m")
            try:
                result = subprocess.run([tailwind_path, "-i", "tailwind.css", "-o", "./mg/style.css", "--watch"], capture_output=True, text=True)
                if not result.returncode == 0:
                    print("\033[91mTailwind CSS build failed.\033[0m")
                    print(result.stderr.strip().splitlines()[-1])
                    exit(1)
            except (subprocess.SubprocessError, FileNotFoundError):
                print("\033[91mTailwind CSS not found. Please install it or add it to PATH first.\033[0m")
                exit(1)
            except KeyboardInterrupt:
                print("\033[93mExiting Tailwind CSS dev mode...\033[0m")
                exit(0)
        elif os.sys.argv[1] == "--build":
            build_release()
        else:
            print("\033[91mInvalid argument. \033[0m")
    else:
        print("  \033[96m--dev\033[0m \trun Tailwind CSS in dev mode")
        print("  \033[96m--build\033[0m \tbuild the release\n")
    
    