export default function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) return <p>No tasks.</p>;

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span>{todo.title}</span>
          <button
            onClick={() => onDelete(todo.id)}
            aria-label="delete"
            className="delete-btn"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
