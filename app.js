const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const contactRouter = require("./controllers/contact");
const middleware = require("./utils/middleware");

app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use("api/persons", contactRouter);

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

// let persons = [
//     {
//       "id": 1,
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": 2,
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": 3,
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": 4,
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]

// checking routes
// app.get("/", (req, res) => {
//     res.send("<h1>Hello World</h1>")
// })

// ERROR HANDLER MIDDLEWARE
app.use(middleware.unKnownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
