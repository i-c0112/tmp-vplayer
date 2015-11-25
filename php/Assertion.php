<?php
include "autoload.php";
class Assertion {
  public function __construct(ErrOutput $output) {
    $this->output = $output;
    $this->callback = function($file, $line, $code, $desc) {
      $this->output->pute(1, "Assertion failed in $file at line $line.\n$code\n\nDescription: $desc");
    };
  }

  public static function applyAssertion(Assertion $assert) {
    assert_options(ASSERT_CALLBACK, $assert->this->callback);
  }

  protected $output;
  protected $callback;
}
?>
