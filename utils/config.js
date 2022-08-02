const dotenv = require("dotenv");

dotenv.config();

const Port = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI;

module.exports = {
  Port,
  MONGO_URI,
};
