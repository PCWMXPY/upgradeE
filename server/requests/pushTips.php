<?php
$domain = $_REQUEST['domain'];
$side = $_REQUEST['side'];
$content = $_REQUEST['content'];

$file = file_get_contents('../storage/Tips.json');
$file = json_decode($file);
$re = 0;
if(property_exists($file,$domain)){
    $temp = $file->$domain;
    $temp1 = $temp[0];
    $temp2 = $temp[1];
    if($side == 0){
        array_push($temp1,$content);
    }else{
        array_push($temp2,$content);
    }
    $file->$domain = array($temp1,$temp2);
    $re = 1;
}else{
    $empty = array();
    if($side == 0){
        $file->$domain = array(array($content),$empty);
    }else{
        $file->$domain = array($empty,array($content));
    }
    $re = 2;
}
$file = json_encode($file);
file_put_contents('../storage/Tips.json',$file);
echo $re;