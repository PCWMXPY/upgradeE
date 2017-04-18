<?php
$ana = $_POST['p'];
$file = file_get_contents('./test.json');
$file.=$ana;
file_put_contents('./test.json',$ana);
echo 'done';