const { v4: uuidv4 } = require('uuid');
const Todo = require('../models/Todo');

const getTodos = (req, res) => {
  const userId = req.userId;
  Todo.findByUserId(userId, (err, todos) => {
    if (err) return res.status(500).send('Error fetching todos');
    res.send(todos);
  });
};

const createTodo = (req, res) => {
  const userId = req.userId;
  const { task, status } = req.body;
  const todoId = uuidv4();

  Todo.create(todoId, userId, task, status, (err) => {
    if (err) return res.status(500).send('Error creating todo');
    res.status(201).send({ message: 'Todo created' });
  });
};

const updateTodoStatus = (req, res) => {
  const { todoId } = req.params;
  const { status } = req.body;

  Todo.updateStatus(todoId, status, (err) => {
    if (err) return res.status(500).send('Error updating todo status');
    res.send({ message: 'Todo status updated' });
  });
};

const deleteTodo = (req, res) => {
  const { todoId } = req.params;

  Todo.delete(todoId, (err) => {
    if (err) return res.status(500).send('Error deleting todo');
    res.send({ message: 'Todo deleted' });
  });
};

module.exports = { getTodos, createTodo, updateTodoStatus, deleteTodo };
