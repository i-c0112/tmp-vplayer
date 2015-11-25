<?php
include "autoload.php";

class InputValidate {
  const INPUT_LOGIN = "/^[a-zA-Z_\-]{5,}$/";
  // TODO add INPUT_COOKIE

  public function __construct($regex) {
    $this->regex = $regex;
  }

  public function validate($str){
    return preg_match($this->regex, $str);
  }

  protected $regex;
}
?>
