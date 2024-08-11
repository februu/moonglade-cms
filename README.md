# Welcome to MoonGlade!

MoonGlade CMS is an exceptionally simple flat-file content management system (CMS) built with PHP. As my first PHP project, it's a work in progress and may not be perfect, but it effectively serves its purpose. MoonGlade CMS allows for easy modification of basic .html websites through an admin panel, all while minimizing the amount of code required for setup.

---

### Motivation

I created MoonGlade because I needed an easy way to edit my static sites without coming back to text editor and FTP client every time I wanted to change something.

---

### Requirements

- Apache webserver capable of running PHP code.

---

### Installation

1. Download current release of MoonGlade and unzip it in root directory of your webserver.
2. Open the browser and go to your webserver address to check if everything works properly.
3. Go to the _/mg/setup_ page.
4. Create your credentials:
   - **Username** (5-20 characters, can include numbers, letters, and underscores).
   - **Password** (8-32 characters, must include at least one lowercase letter, one uppercase letter, and one number).
5. Log in to the admin panel (_/mg-admin/_).
6. Navigate to the **Settings** tab and scroll to the last section on the page.
7. Give a name to your new editable section and click **Add Editable Section File**.  
   _Section IDs may only contain numbers, letters, and underscores._
8. Place your static websites in the main directory of the site and change their extensions to `.php`.
9. Open the file where you want to include the editable section and add the following code:

   ```php
   // Add this at the top of the file
   // (pass the relative path to mg/template.php script as an argument)
   include('mg/template.php');

   // Place this where you want the editable section to appear
   <div><?php editable('name_of_your_section'); ?></div>
   ```

10. Repeat the last three steps for each page you want to edit from the admin panel.
11. That's it! You can now edit the contents of your pages in the Content tab in the admin panel.

---

### To do

- [x] add ability to edit static sites
- [ ] add ability to clone sites from admin panel

---

### Special Thanks

Special thanks to [https://github.com/oxalorg/sakura](https://github.com/oxalorg/sakura) which I used to stylize the index page you can see after fresh installation of MoonGlade.
