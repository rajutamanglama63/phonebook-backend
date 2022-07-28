const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const Port = process.env.PORT || 3002;

app = express();

app.use(express.static("build"))  
app.use(cors());
app.use(express.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

let persons = [
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

// checking routes
// app.get("/", (req, res) => {
//     res.send("<h1>Hello World</h1>")
// })

// api to get lists of person
app.get("/api/persons", (req, res) => {
    res.status(200).send(persons)
})

// api to get phonebook info
app.get("/api/info", (req, res) => {
    const date = new Date();
    res.status(200).send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

// api to get specific person
app.get("/api/persons/:id", (req, res) => {
    const currentId = Number(req.params.id)
    const specificPerson = persons.find((person) => person.id === currentId)
// console.log(specificPerson)
    if(persons.includes(specificPerson)) res.status(200).json(specificPerson)
    else res.status(404).json({err : "404 not found", msg : "Person with that id doesnot exist."})
})

// api to delete specific person
app.delete("/api/persons/:id", (req, res) => {
  const currentId = Number(req.params.id)
  persons = persons.filter((person) => person.id !== currentId)

  res.status(202).json({msg : "Contact successfully deleted."})
})

// api to add new person's contact in phonebook
app.post("/api/persons/", (req, res) => {
  const newPerson = req.body;
  newPerson.id = Math.floor(Math.random() * 10000);

  const contact = persons.find((person) => person.name === newPerson.name)
  // console.log(contact)

  if(!newPerson.name || !newPerson.number) {
    res.status(406).json({error : "name and number are required."})
  } else if(persons.includes(contact)) {
    res.status(400).json({error : "name must be unique."})
  } else {
    persons.push(newPerson);
    res.status(200).json({msg : "Contact successfully created."})
  }
  
})

app.listen(Port, (req, res) => {
    console.log(`Server running on port http://localhost:${Port}`);
});