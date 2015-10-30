define([], function() {
var config = {
  regex: /^[a-zA-z_\-]{5,}$/
}
function validate(s) {
  try{
    return config.regex.test(s);
  } catch (e) {
    console.log(e);
    return false;
  }
}
return {
  validate: validate
}
});
