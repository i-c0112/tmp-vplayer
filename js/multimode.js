define(["jquery", "inputValidate"], function($, inputValidate) {
"use strict";
var config = {
  serverUrl: "http://localhost/mplayer/vplayer-server/dummy.php",
};
function login(uname, upass, callback) {
  // TODO send request to authentication server
  if (!inputValidate.validate(uname)) {}
  if (!inputValidate.validate(upass)) {}
  var udata = {
    uname: "dummy",
    upass: "dummy"
  };
  $.post(config.serverUrl, udata, function(sdata, textStatus, jqXHR) {
    if (!sdata.err) {
      sdata.err = 0;
    }
    callback(sdata.err, sdata);
  }, "json");
}
function host(accessToken, data) {
  // TODO open a websocket for incoming connection
  // request monitor server to let others see we are hosting
  // close connection if accessToken rejected by server
  //
}
console.log("multimode.js loaded.");
return {
  login: login,
  host: host
};
});
