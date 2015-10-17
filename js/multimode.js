define(["jquery", "inputValidate"], function($, inputValidate) {
"use strict";
var config = {
  serverUrl: "http://localhost",
};
return {
  login: function(uname, upass, callback) {
    var accessToken = null, err = null;
    // TODO send request to authentication server
    if (!inputValidate.validate(uname)) {}
    if (!inputValidate.validate(upass)) {}
    callback(status, {
      "accessToken": accessToken,
      "err": err,
    });
  },
  host: function(accessToken, data) {
    // TODO open a websocket for incoming connection
    // request monitor server to let others see we are hosting
    // close connection if accessToken rejected by server
    //
  }
}
});
