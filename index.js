const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

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

const generateId = () => {
  return parseInt(Math.random() * 1000000);
};

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({
      error: "No content in request",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
