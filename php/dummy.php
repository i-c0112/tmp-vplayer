<?php
include "autoload.php";
include "constant.php";

function update_login_status($access) {
  $dbcon = new DbCon();
  $qs = sprintf("UPDATE `user` SET status='%d',alive=TRUE WHERE access='$access'", USER_STATUS_ONLINE);
  $dbcon->query($qs);
}

function user_login() {
  try {
    // "@" to supress E_NOTICE message
    $access = @$_COOKIE["access"];
    $uname = $_POST["uname"];
    $upass = $_POST["upass"];
    $login = new Authorization($uname, $upass);
    $result = null;
    if ($access = $login->authorize($access)) {
      # update login status
      update_login_status($access);
      $result = array("access"=>$access);
    } else {
      # authenticate login info
      $access = $login->authenticate();
      if ($access) {
        update_login_status($access);
        $result = array("access"=>$access);
      } else {
        $result = $erroutput->pute(1, "No matching login info is found.");
      }
    }
    return $result;
  } catch (UnexpectedValueException $uve) {
    $erroutput = new ErrOutput(ErrOutput::JSON);
    return $erroutput->pute(1, "Invalid input detected.");
  }
}

# EXTERNAL LOGIC START
header("Content-Type: application/json; charset=utf-8");
print json_encode(user_login());
?>
