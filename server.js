const StaticServer = require("static-server");
const server = new StaticServer({
  rootPath: "./dist",
  port: 1337,
});

server.start(function () {
  console.log("Server listening to", server.port);
});

server.on("request", function (req, res) {
  console.log(req.path);
});
