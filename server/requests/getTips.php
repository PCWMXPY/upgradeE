<?php
$domain = $_REQUEST['domain'];
$oppo = $_REQUEST['oppo'];
$file = file_get_contents('../storage/Tips.json');
$file = json_decode($file);
$re = array();
if(property_exists($file,$domain)){
    $temp = $file->$domain;
    $temp = $temp[0];
    array_push($re,$temp);
}else{
    array_push($re,array());
}
if(property_exists($file,$oppo)){
    $temp = $file->$oppo;
    $temp = $temp[1];
    array_push($re,$temp);
}else{
    array_push($re,array());
}
$re = json_encode($re);
echo $re;