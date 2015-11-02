<?php
header("Content-Type: application/json; charset=utf-8");
require_once "DbCon.php";

$dbcon = new DbCon();
$result = $dbcon->query("SELECT * FROM `user` WHERE uname='admin'");
out_json($result->fetch_assoc());
?>
