const express = require('express');
const { getTodos, createTodo, updateTodoStatus, deleteTodo } = require('../controllers/todoController');
const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:todoId/status', updateTodoStatus);
router.delete('/:todoId', deleteTodo);

module.exports = router;
