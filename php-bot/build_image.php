<?php

include "Class/image_builder.php";

$x_result = '{"raw":{"~":25,"over":{"x":1}},"processed":"(25)/(x)"}';
$x_result = json_decode($x_result, true);
$sha1 = sha1($x_result["processed"]);

$builder = new image_builder(null, $sha1 . ".png", $x_result);
$x_result = $x_result["raw"];
$builder->build($x_result);

?>