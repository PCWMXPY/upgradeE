<?php

$url = $_GET['url'];
function get($url)
{
    $options = array(
        'http' => array(
            'method' => 'GET',
            'timeout' => 15 * 60,
        ),
    );
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    echo $result;
}
get($url);
