#!/opt/lampp/bin/php
<?php
# Update user status by checking alive field
# Check routine: alive 1 -> alive 0 -> OFFLINE
# Designed to be use with cron

# BUGFIX cron invoke this script in $HOME dir.
chdir(__DIR__);

require_once "DbCon.php";
include_once "constant.php";

$dbcon = new DbCon();

$qs = sprintf("SELECT rid,alive FROM `user` WHERE status!='%d'", USER_STATUS_OFFLINE);
$result = $dbcon->query($qs);
while ($row = $result->fetch_row()) {
  if ($row[1] == 0) {
    $qs = sprintf("UPDATE `user` SET status='%d' WHERE rid='${row[0]}'", USER_STATUS_OFFLINE);
  } else {
    $qs = "UPDATE `user` SET alive=0 WHERE rid='${row[0]}'";
  }
  $dbcon->query($qs);
}
