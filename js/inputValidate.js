define([], function() {
var config = {
  regex: /[a-zA-z_\-]+/;
}
function validate(s) {
  try{
    return config.regex.test(s);
  } catch (e) {
    console.log(e);
    return false;
  }
}
});
