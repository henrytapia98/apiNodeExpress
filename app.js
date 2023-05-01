const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

let users = [
  {
    id: 1,
    firstName: "Daniel",
    lastName: "Calvo",
    email: "dcalvo@polpocr.com",
  },
  {
    id: 2,
    firstName: "Katherine",
    lastName: "Calvo",
    email: "kcalvo@polpocr.com",
  },
];

let todos = [
  {
    id: 1,
    title: "Universidad",
    keywords: ["estudios", "importante", "academia"],
    userId: 1,
  },
  {
    id: 2,
    title: "Casa",
    keywords: ["oficio", "necesario", "orden"],
    userId: 1,
  },
];

let tasks = [
  {
    id: 1,
    title: "Estudiar para el examen de programación",
    completed: 0,
    todoId: 1,
    userId: 1,
  },
  { id: 2, title: "Ir a clases", completed: 1, todoId: 1, userId: 1 },
];

// GET /users
app.get("/users", (req, res) => {
  res.send(users);
});

// GET /users/:id
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.send(user);
});

// POST /users
app.post("/users", (req, res) => {
  const newUser = req.body;
  const id = users.length + 1;

  users.push({ id, ...newUser });
  res.send({ id, ...newUser });
});

// GET /users/:id/todos
app.get("/users/:id/todos", (req, res) => {
  const id = parseInt(req.params.id);
  const userTodos = todos.filter((todo) => todo.userId === id);

  res.send(userTodos);
});

// GET /todos/:id
app.get("/users/:id/todos", async (req, res) => {
  try {
    // Obtener el id del usuario de los parámetros de la URL
    const userId = req.params.id;

    // Buscar todas las tareas asociadas al usuario en la base de datos
    const todos = await Todo.findAll({
      where: { userId },
    });

    // Devolver las tareas en formato JSON
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ha ocurrido un error al obtener las tareas del usuario.",
    });
  }
});

//GET /todos/:id
app.get("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const todo = todos.find((todo) => todo.id === parseInt(todoId));

  if (!todo) {
    return res.status(404).send("Todo not found");
  }

  const todoWithPendings = {
    id: todo.id,
    title: todo.title,
    keywords: todo.keywords,
    userId: todo.userId,
    todos: pendings.filter((pending) => pending.todoId === todo.id),
  };

  res.send(todoWithPendings);
});

// POST /todos/:id/task
app.post("/todos/:id/task", (req, res) => {
  const id = parseInt(req.params.id);
  const newTask = req.body;
  const taskCount = tasks.filter((task) => task.todoId === id).length;
  const userId = todos.find((todo) => todo.id === id).userId;
  const task = { id: taskCount + 1, ...newTask, todoId: id, userId };

  tasks.push(task);
  res.send(task);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
