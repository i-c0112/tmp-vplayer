<?php
require_once "output.php";

class DbCon extends mysqli {
  public function __construct() {
    $file = @fopen(".dbcon.cfg", "r");
    if (!$file) {
      err_json(1, "Failed mysqli connection! No configuration file is found!");
    }
    $cfg = fgetcsv($file);
    parent::__construct($cfg[0], $cfg[1], $cfg[2], $cfg[3]);

    if ($this->connect_errno) {
      err_json($this->connect_errno, $this->connect_error);
    }
  }

  public function checkError() {
    if ($this->errno) {
      err_json($this->errno, $this->error);
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
