// phonebook-backend
const express = require("express");
const app = express();

// for getting the body from request
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//for cross origin resource sharing
const cors = require("cors");
app.use(cors());

// for displaying static content
app.use(express.static("build"));

// for mongoDB
const Person = require("./models/person");

// for environment variables
require("dotenv").config();

// local persons list
let persons = [
  {
    name: "Tan",
    number: "2342234",
    id: 1,
  },
  {
    name: "Tuna",
    number: "5647389",
    id: 2,
  },
  {
    name: "Tamer",
    number: "8574639",
    id: 3,
  },
  {
    name: "Reva",
    number: "9435835",
    id: 4,
  },
  {
    name: "Koray",
    number: "3453452",
    id: 5,
  },
];

// automatically generating the ids
const generateId = () => {
  return parseInt(Math.random() * 1000000);
};

const formatPerson = (person) => {
  const formattedPerson = { ...person._doc, id: person._id };
  delete formattedPerson._id;

  return formattedPerson;
};

// requests
// app.get("/api/persons", (request, response) => {
//   response.json(persons);
// });

app.get("/api/persons", (request, response) => {
  Person.find({}, { __v: 0 }).then((result) => {
    response.json(result.map(formatPerson));
  });
});

// app.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.find((person) => person.id === id);

//   if (person) {
//     response.json(person);
//   } else {
//     response.status(404).end();
//   }
// });

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id, { __v: 0 })
    .then((person) => {
      response.json(formatPerson(person));
    })
    .catch((err) => {
      console.log(err);
      response.status(404).end();
    });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      response.status(400).send({ error: "malformatted id" });
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "No content in request",
    });
  }

  const found = persons.some((person) => person.name === body.name);
  if (found) {
    return response.status(400).json({
      error: "Name must be unique!",
    });
  }

  // const person = {
  //   name: body.name,
  //   number: body.number,
  //   id: generateId(),
  // };

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  persons = persons.concat(person);

  person.save().then((person) => {
    response.json(person);
  });
});

// for port and listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
