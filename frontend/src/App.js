import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  // URL del backend accesible desde Docker Compose
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
;

  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = () => {
    fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
    })
      .then(() => {
        setNewTask('');
        return fetch(`${API_URL}/todos`);
      })
      .then(res => res.json())
      .then(data => setTodos(data));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={addTodo}>Agregar</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
