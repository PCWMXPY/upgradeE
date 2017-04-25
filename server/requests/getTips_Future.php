<?php
$domain = $_REQUEST['domain'];
$oppo = $_REQUEST['oppo'];
$drunes = $_REQUEST['drunes'];
$dmysterys = $_REQUEST['dmysterys'];
$orunes = $_REQUEST['orunes'];
$omysterys = $_REQUEST['omysterys'];

$file = file_get_contents('../storage/Tips.json');
$file = json_decode($file);
$drunes = json_decode($drunes);
$dmysterys = json_decode($dmysterys);
$orunes = json_decode($orunes);
$omysterys = json_decode($omysterys);
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

array_push($re, runmystery($drunes, 0, $file));
array_push($re, runmystery($orunes, 1, $file));
array_push($re, runmystery($dmysterys, 0, $file));
array_push($re, runmystery($omysterys, 1, $file));
function runmystery($array, $side, $file){
    $res = array();
    for($x=0;$x<count($array);$x++){
        if(property_exists($file,$array[$x])){
            $temp = $file->$array[$x];
            $temp = $temp[$side];
            array_push($res,$temp);
        }
    }
    return $res;
}

$re = json_encode($re);
echo $re;