define(["jquery", "inputValidate"], function($, inputValidate) {
"use strict";
var config = {
  serverUrl: "http://localhost/mplayer/vplayer-server/dummy.php",
};
function login(uname, upass, callback) {
  var err = 0, accessToken = null, err = null;
  // TODO send request to authentication server
  if (!inputValidate.validate(uname)) {}
  if (!inputValidate.validate(upass)) {}
  var data = {
    uname: "dummy",
    upass: "dummy"
  };
  $.post(serverUrl, data, function(data, textStatus, jqXHR) {
    err = data.err, accessToken = data.accessToken, errMsg = data.errMsg;
    if (err > 0) {
      callback(err, {
        errMsg: errMsg
      });
    }
  });
}
function host(accessToken, data) {
  // TODO open a websocket for incoming connection
  // request monitor server to let others see we are hosting
  // close connection if accessToken rejected by server
  //
}
return {
  login: login,
  host: host
};
});
