define(["multimode"], function(multi) {
  var c = function(err, sdata) {
    console.log("err: " + err);
    console.log("sdata: " + JSON.stringify(sdata, null, 2));
  }
  var ret = function() {multi.login("admin", "nopasswd", c)};
  ret();
  return ret;
});
