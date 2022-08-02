const app = require("./app"); //exporting actual express application
const http = require("http"); //http module have lot more feature then express to utilize
const logger = require("./utils/logger");
const config = require("./utils/config");

const server = http.createServer(app);

server.listen(config.Port, () => {
  logger.info(`Server running on port http://localhost:${config.Port}`);
});
