<?php
function err_json($errno, $errmsg) {
  out_json(array("err"=>$errno, "errMsg"=>$errmsg));
}

function out_json(array $jsonObj) {
  print json_encode($jsonObj);
  exit;
}
?>
