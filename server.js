const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const Contact = require("./models/contactSchema");

dotenv.config();

const Port = process.env.PORT || 3002;

app = express();

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

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

// api to get lists of contact of persons
app.get("/api/persons", (req, res, next) => {
  // res.status(200).send(persons);

  Contact.find()
    .then((allContact) => {
      res.status(200).json(allContact);
    })
    .catch((err) => next(err));
});

// api to get phonebook info
app.get("/api/info", (req, res) => {
  const date = new Date;

  Contact.find().then((allContact) => {
    res
    .status(200)
    .send(
      `<p>Phonebook has info for ${allContact.length} people</p><p>${date}</p>`
    );
  })
 
});

// api to update specific person's contact info
app.put("/api/persons/:id", (req, res, next) => {
  const contactId = req.params.id;

  const contactToUpdate = {
    name: req.body.name,
    number: req.body.number,
  };

  Contact.findByIdAndUpdate(contactId, contactToUpdate, { new: true, runValidators : true, context : "query" })
    .then((updatedContact) => {
      res.status(200).json({success : true, msg : "Contact updated successfully.", updatedContact});
    })
    .catch((err) => next(err));
});

// api to get specific person
app.get("/api/persons/:id", (req, res, next) => {
  // USING HARD CODED ARREY AD DB
  //   const currentId = Number(req.params.id);
  //   const specificPerson = persons.find((person) => person.id === currentId);
  //   // console.log(specificPerson)
  //   if (persons.includes(specificPerson)) res.status(200).json(specificPerson);
  //   else
  //     res.status(404).json({
  //       err: "404 not found",
  //       msg: "Person with that id doesnot exist.",
  //     });

  // USING MONGO AS DB
  const currId = req.params.id;
  Contact.findById(currId)
    .then((specificPerson) => {
      res.status(200).json(specificPerson);
      // console.log(specificPerson);
    })
    .catch((err) => next(err));
});

// api to delete specific person
app.delete("/api/persons/:id", (req, res, next) => {
  // USING HARD CODED ARREY AD DB
  //   const currentId = Number(req.params.id);
  //   persons = persons.filter((person) => person.id !== currentId);

  //   res.status(202).json({ msg: "Contact successfully deleted." });

  // USING MONGO AS DB
  const currId = req.params.id;

  Contact.findByIdAndRemove(currId)
    .then((deletedContact) => {
      res.status(202).json({ success: "Successfully deleted", deletedContact });
    })
    .catch((err) => next(err));
});

// api to add new person's contact in phonebook
app.post("/api/persons/", (req, res, next) => {
  // USING HARD CODED ARREY AD DB
  // const newPerson = req.body;
  // // newPerson.id = Math.floor(Math.random() * 10000);

  // const contact = persons.find((person) => person.name === newPerson.name)
  // // console.log(contact)

  // if(!newPerson.name || !newPerson.number) {
  //   res.status(406).json({error : "name and number are required."})
  // } else if(persons.includes(contact)) {
  //   res.status(400).json({error : "name must be unique."})
  // } else {
  //   persons.push(newPerson);
  //   res.status(200).json({msg : "Contact successfully created."})
  // }

  // USING MONGODB

  // if (req.body.name === undefined) {
  //   return res.status(400).json({ err: "name missing" });
  // }

  const contact = new Contact({
    name: req.body.name,
    number: req.body.number,
    date: new Date(),
  });

  contact.save().then((savedContact) => {
    res.status(200).json({success : true, msg : "Contact successfully created.", savedContact});
  }).catch((err) => next(err));
})

// ERROR HANDLER MIDDLEWARE
const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ err: "malformatted id" });
  } else if(err.name === "ValidationError") {
    return res.status(400).json({err : err.message})
  }

  next(err);
};

app.use(errorHandler);

app.listen(Port, () => {
  console.log(`Server running on port http://localhost:${Port}`);
});
