const app = require("./app"); //exporting actual express application
const http = require("http"); //http module have lot more feature then express to utilize

const server = http.createServer(app);

server.listen(Port, () => {
  console.log(`Server running on port http://localhost:${Port}`);
});
