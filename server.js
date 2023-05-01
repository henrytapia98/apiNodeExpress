const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const database = {
  users: [],
  todos: [],
  tasks: [],
};

app.get("/users", (req, res) => {
  res.json(database.users);
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = database.users.find((u) => u.id === id);

  if (!user) {
    res.status(404).json({ error: `User with id ${id} not found.` });
  } else {
    res.json(user);
  }
});

app.post("/users", (req, res) => {
  const { firstName, lastName, email } = req.body;
  const newUser = { id: database.users.length + 1, firstName, lastName, email };

  database.users.push(newUser);
  res.json(newUser);
});

app.get("/users/:id/todos", (req, res) => {
  const id = parseInt(req.params.id);
  const userTodos = database.todos.filter((t) => t.userId === id);

  res.json(userTodos);
});

app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = database.todos.find((t) => t.id === id);
  const todoTasks = database.tasks.filter((t) => t.todoId === id);

  if (!todo) {
    res.status(404).json({ error: `Todo with id ${id} not found.` });
  } else {
    res.json({ ...todo, tasks: todoTasks });
  }
});

app.post("/todos/:id/task", (req, res) => {
  const { title, completed } = req.body;
  const todoId = req.params.id;
  const userId = 1; // aquí debería ir la lógica para obtener el ID del usuario
  const taskId = generateTaskId(); // aquí debería ir la lógica para generar un nuevo ID de tarea

  const newTask = {
    id: taskId,
    title,
    completed,
    todoId,
    userId,
  };

  // Aquí debería ir la lógica para guardar la nueva tarea en el repositorio de datos

  res.json(newTask);
});
