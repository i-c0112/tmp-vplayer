<?php
header("Content-Type: application/json; charset=utf-8");
require_once "DbCon.php";
include_once("constant.php");

$dbcon = new DbCon();
if (isset($_COOKIE["access"])) {
  $qs = sprintf("UPDATE `user` SET status='%d',alive=TRUE WHERE access='${_COOKIE["access"]}'", USER_STATUS_ONLINE);
  $dbcon->query($qs);
  err_json(2, "cookie: ${_COOKIE["access"]}");
}

$result = $dbcon->query("SELECT * FROM `user` WHERE uname='admin'");

$rand = bin2hex(openssl_random_pseudo_bytes(8));
$fetch = $result->fetch_assoc();
$rand .= $fetch["uname"];
$rand = openssl_digest($rand, "sha1");
$fetch["access"] = $rand;

$qs = sprintf("UPDATE `user` SET access='$rand',status='%d',alive=TRUE WHERE uname='${fetch["uname"]}'", USER_STATUS_ONLINE);
$dbcon->query($qs);
// setting domain to "localhost" does NOT work. Why???
setcookie("access", $rand, 0, "/mplayer/tmp-vplayer/");
out_json($fetch);
?>
