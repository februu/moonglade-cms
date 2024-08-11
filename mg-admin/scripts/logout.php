<?php
session_start();
session_unset();
session_destroy();
header("location: /mg-admin/index.php?message=" . urlencode("Logged out successfully."));
