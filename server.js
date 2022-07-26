const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const Port = process.env.PORT || 3002;

app = express();

app.use(cors());
app.use(express.json());

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.listen(Port, (req, res) => {
    console.log(`Server running on port http://localhost:${Port}`);
});