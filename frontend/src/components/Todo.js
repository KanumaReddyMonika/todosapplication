import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Todo() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5001/api/todos', {
        headers: { Authorization: token },
      });
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.post(
      'http://localhost:5001/api/todos',
      { task, status: 'pending' },
      { headers: { Authorization: token } }
    );
    setTasks([...tasks, data]);
    setTask('');
  };

  const updateTaskStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    await axios.put(
      `http://localhost:5001/api/todos/${id}/status`,
      { status },
      { headers: { Authorization: token } }
    );
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5001/api/todos/${id}`, {
      headers: { Authorization: token },
    });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <span>{t.task} - {t.status}</span>
            <button onClick={() => updateTaskStatus(t.id, 'done')}>Mark as Done</button>
            <button onClick={() => updateTaskStatus(t.id, 'in progress')}>In Progress</button>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
