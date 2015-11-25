<?php
include "autoload.php";

class FriendList {
  public function __construct($access) {
    $m_access = $access;
  }
  private $m_access; // whose friend to query
}
?>
