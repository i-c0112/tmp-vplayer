<?php
include "autoload.php";

class DbCon extends mysqli {
  public function __construct() {
    $file = @fopen(".dbcon.cfg", "r");
    if (!$file) {
      throw new Exception("No configuration file for db connection is found.");
    }
    $cfg = fgetcsv($file);
    parent::__construct($cfg[0], $cfg[1], $cfg[2], $cfg[3]);

    if ($this->connect_errno) {
      throw new DbConException($this->connect_error, $this->connect_errno);
    }
  }

  public function checkError() {
    if ($this->errno) {
      throw new DbConException($this->error, $this->errno);
    }
  }

  public function query($s) {
    $this->lastResult = parent::query($s);
    $this->checkError();
    return $this->lastResult;
  }

  protected $lastResult;
}
?>
