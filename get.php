<?php

use Mapper\Fetch;
spl_autoload_register();

$fetch = new Fetch();
$kategorie =  json_decode($_POST["kategorie"]);
$entfernung =  json_decode($_POST["entfernung"]);
$preis =  json_decode($_POST["preis"]);
$veggie =  json_decode($_POST["veggie"]);

echo json_encode($fetch->read($kategorie, $entfernung, $preis, $veggie));

?>