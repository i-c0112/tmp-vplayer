requirejs.config({
  baseUrl: "js/",
  paths: {
    jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min"
  }
});

requirejs(["es6/gen/index"]);
