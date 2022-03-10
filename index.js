const express = require("express");
const app = express();

const persons = [
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
