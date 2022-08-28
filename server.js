const port =
  process.env.OPENSHIFT_NODEJS_PORT ||
  process.env.VCAP_APP_PORT ||
  process.env.PORT ||
  process.argv[2] ||
  8765;
const express = require("express");
const Gun = require("gun");

const app = express();
//const port = 8000;
app.use(Gun.serve);
app.use(express.static(__dirname));

const server = app.listen(port, () => {
  console.log("Listening at: http://localhost://" + port + __dirname);
});

let gun = Gun({
  peers: ["https://ngegun.glitch.me/gun"],
  web: server,
});

let servers = gun.get("servers");
let thisServer = servers.get("heroku");
setInterval(() => thisServer.put(`${Date.now()}`), 5000);
