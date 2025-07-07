<?php
$_POST = json_decode(file_get_contents("php://input"), true); // Get JSON data
echo var_dump($_POST);