const express = require("express");
const app = express();

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
