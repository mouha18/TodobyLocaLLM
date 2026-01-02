import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

import confetti from 'canvas-confetti';      // <‑‑ NEW
import { QUOTES } from './quotes';          // <‑‑ NEW

const API = 'http://localhost:4000/api/todos';

export default function App() {
  /* ---------- State ---------- */
  const [todos, setTodos] = useState([]);
  const [points, setPoints] = useState(0);     // Gamification
  const [quote, setQuote] = useState('');      // Daily Quote

  /* ---------- Fetch todos ---------- */
  useEffect(() => {
    axios.get(API).then(r => setTodos(r.data));
  }, []);

  /* ---------- Daily Quote (once per day) ---------- */
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('dailyQuote');
    const storedDay = localStorage.getItem('quoteDay');

    if (stored && storedDay === today) {
      setQuote(stored);
    } else {
      const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      localStorage.setItem('dailyQuote', q);
      localStorage.setItem('quoteDay', today);
      setQuote(q);
    }
  }, []);

  /* ---------- Theme based on remaining tasks ---------- */
  useEffect(() => {
    const remaining = todos.filter(t => !t.completed).length;
    // If fewer than 3 left → “happy” theme, else “normal”
    document.documentElement.setAttribute(
      'data-theme',
      remaining <= 3 ? 'happy' : 'neutral'
    );
  }, [todos]);

  /* ---------- Helper: Toggle completion ---------- */
  const toggleTodo = id => {
    const todo = todos.find(t => t.id === id);
    axios
      .put(`${API}/${id}`, { completed: !todo.completed })
      .then(r => {
        setTodos(todos.map(t => (t.id === id ? r.data : t)));

        // 🎉 Confetti if now completed
        if (!todo.completed) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });

          // Add points
          setPoints(p => p + 10);
        }
      });
  };

  /* ---------- Helper: Delete ---------- */
  const deleteTodo = id =>
    axios.delete(`${API}/${id}`).then(() =>
      setTodos(todos.filter(t => t.id !== id))
    );

  /* ---------- Add a new todo ---------- */
  const addTodo = title =>
    axios.post(API, { title }).then(r => setTodos([...todos, r.data]));

  /* ---------- Render ---------- */
  return (
    <div className="app">
      <h1>Todo List</h1>

      {/* Daily Quote */}
      <blockquote style={{ textAlign: 'center', color: 'var(--accent)' }}>
        {quote}
      </blockquote>

      {/* Points & Level */}
      <p style={{ textAlign: 'center' }}>
        🎖️  {points} pts – Level {Math.floor(points / 50) + 1}
      </p>

      {/* Form & List */}
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}
