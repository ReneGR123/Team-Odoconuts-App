// EXAMPLE backend.js CODE TO ENSURE IT RUNS
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" },
  ],
};

app.use(cors());
app.use(express.json());

// ---------- helpers ----------

// Naive random ID: 6 characters of base 36 (letters + digits)
const generateId = () => Math.floor(Math.random() * 1000).toString() //Math.random().toString(36).substring(2, 8);

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const findUserByName = (name) =>
  users["users_list"].filter((user) => user["name"] === name);

const findUsersByNameAndJob = (name, job) =>
  users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );

const addUser = (user) => {
  const newUser = { ...user, id: generateId() };
  users["users_list"].push(newUser);
  return newUser;
};

const deleteUserById = (id) => {
  const userIndex = users["users_list"].findIndex((user) => user["id"] === id);
  if (userIndex === -1) {
    return undefined;
  }
  return users["users_list"].splice(userIndex, 1)[0];
};

// ---------- routes ----------

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    res.send({ users_list: findUsersByNameAndJob(name, job) });
  } else if (name !== undefined) {
    res.send({ users_list: findUserByName(name) });
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  const result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const newUser = addUser(req.body);
  res.status(201).send(newUser);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const result = deleteUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});