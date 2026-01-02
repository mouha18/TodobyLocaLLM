import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const API = 'http://localhost:4000/api/todos';

export default function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos
  useEffect(() => {
    axios.get(API).then(r => setTodos(r.data));
  }, []);

  // Add a todo
  const addTodo = title =>
    axios.post(API, { title }).then(r => setTodos(todos.concat(r.data)));

  // Toggle completion
  const toggleTodo = id =>
    axios.put(`${API}/${id}`, {
      completed: !todos.find(t => t.id === id).completed,
    }).then(r => {
      setTodos(todos.map(t => (t.id === id ? r.data : t)));
    });

  // Delete a todo
  const deleteTodo = id => {
    axios.delete(`${API}/${id}`).then(() =>
      setTodos(todos.filter(t => t.id !== id))
    );
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}
