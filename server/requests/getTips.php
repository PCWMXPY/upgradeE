<?php
$domain = $_REQUEST['domain'];
$oppo = $_REQUEST['oppo'];

$file = file_get_contents('../storage/Tips.json');
$file = json_decode($file);
$re = array(0);
if(property_exists($file,$domain)){
    $re[0] = 1;
    $temp = $file->$domain;
    $temp =  $temp[0];
    array_push($re,$temp);
}
if(property_exists($file,$oppo)){
    if($re[0] == 1){
        $re[0] = 2;
        $temp = $file->$oppo;
        $temp =  $temp[1];
        array_push($re,$temp);
    }
}
$re = json_encode($re);
echo $re;