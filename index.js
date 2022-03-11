// phonebook-backend
const express = require("express");
const app = express();

// for getting the body from request
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//for cross origin resource sharing
const cors = require("cors");
app.use(cors());

// for mongoDB
const Person = require("./models/person");

// for displaying static content
app.use(express.static("build"));

// makes the objects from mongoDB to fit with our notation
const formatPerson = (person) => {
  const formattedPerson = { ...person._doc, id: person._id };
  delete formattedPerson._id;

  return formattedPerson;
};

// requests
app.get("/api/persons", (request, response) => {
  Person.find({}, { __v: 0 }).then((result) => {
    response.json(result.map(formatPerson));
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id, { __v: 0 })
    .then(formatPerson)
    .then((formattedPerson) => response.json(formattedPerson))
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

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then(formatPerson)
    .then((formattedPerson) => response.json(formattedPerson));
});

// for port and listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
