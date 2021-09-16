<?php

function hitRectangle($x, $y ,$r)
{
    return ($x >= -$r/2 && $x <= 0) && ($y >= 0 && $y <= $r);
}

function hitTriangle($x, $y, $r)
{
    return ($y >= -2 * $x - $r && $y <= 0) && ($x >= - ($y + $r) / 2 && $x <= 0);
}

function hitSector($x, $y, $r)
{
    return ($x <= sqrt($r ** 2 - $y ** 2) && $x >= 0) && ($y >= - sqrt($r ** 2 - $x ** 2) && $y <= 0);
}

function hit($x, $y, $r)
{
    return hitRectangle($x, $y, $r) || hitTriangle($x, $y, $r) || hitSector($x, $y, $r);
}

// Main code goes here

if (isset($_GET["x"]))
{
    $x = $_GET["x"];
    if ($x === "-0")
    {
        $x = 0;
    }
}
if (isset($_GET["y"]))
{
    $y = $_GET["y"];
}
if (isset($_GET["r"]))
{
    $r = $_GET["r"];
}

if(isset($x) && isset($y) && isset($r)) {

    $answer = "false";

    if (hit($x, $y, $r)) {
        $answer = "true";
    }

    $time = date("H:i:s", time() - $_GET["time"] * 60);
    $executionTime = round(microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"], 7);

    $response = '{"x":"' . $x . '","y":"' . $y . '","r":"' . $r . '","current":"' . $time . '","execution":"' . $executionTime . '","result":' . $answer . '}';

    echo $response;
} else {
    echo "не все аргументы";
}

?>