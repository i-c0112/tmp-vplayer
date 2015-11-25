<?php
require "autoload.php";

class Authorization {
  public function __construct($name = "", $pass = "") {
    $validator = new InputValidate(InputValidate::INPUT_LOGIN);
    if (!$validator->validate($name) || !$validator->validate($pass)) {
      throw new UnexpectedValueException("Invalid username or password!");
    }
    $this->uname = $name;
    $this->upass = $pass;
    $this->access = null;
  }

  public function authenticate() {
    try {
      $dbcon = new DbCon();
      $qs =  "SELECT access FROM `user` WHERE uname='$this->uname' AND upass='$this->upass'";
      $result = $dbcon->query($qs);
      if ($result && $result->num_rows > 0) {
        $this->access = $result->fetch_row()[0];
      } else {
        $this->access = null;
      }
    } catch (Exception $e) {
      $this->access = null;
    }
    return $this->access;
  }

  public function authorize($access = null) {
    if (!isset($access)) {$access = $this->access;}
    try {
      # TODO add cookie value validation check
      $dbcon = new DbCon();
      $qs = "SELECT rid from `user` WHERE access='$access'";
      $result = $dbcon->query($qs);
      if ($result && $result->num_rows > 0) {
        $this->access = $access;
      } else {
        $this->access = null;
      }
    } catch (Exception $e) {
      # Db connection failure?
      $this->access = null;
    }
    return $this->access;
  }

  private $uname;
  private $upass;
  private $access;
}
?>
