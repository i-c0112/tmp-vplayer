<?php
include "autoload.php";

class ErrOutput {
  const HTML = 1;
  const JSON = 2;

  public function __construct($fmt) {
    $this->format = $fmt % (ErrOutput::JSON + 1);
    if ($this->format == ErrOutput::HTML) {
      $m_output = "";
    } else if ($this->format == ErrOutput::JSON) {
      $m_output = array();
    } else {
      throw new UnexpectedValueException("Invalid format specifier!");
    }
  }
  
  public function pute($errno, $error = null) {
    if ($format == ErrOutput::HTML) {
      $output = "Error ($errno): $error";
    } else {
      $output = array();
      $output["err"] = $errno;
      $output["errMsg"] = $error;
      $output = json_encode($output);
    }
    print $output;
    return $output;
  }

  private $format = 0;
}
?>
