import { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import type { Todo } from './models/todo';
import './styles/main.scss';

// Hardcoded current todos for initial state
const currentTodo = (): Todo[] => [
  {
    id: Date.now() + 1,
    text: 'Doctor appointment',
    date: new Date('2025-06-02'),
    completed: true,
  },
  {
    id: Date.now() + 2,
    text: 'Meet John',
    date: new Date('2025-06-04'),
    completed: true,
  },
  {
    id: Date.now() + 3,
    text: 'Buy groceries',
    date: new Date(),
    completed: false,
  },
  {
    id: Date.now() + 4,
    text: 'Cook food',
    date: new Date(),
    completed: false,
  },
  {
    id: Date.now() + 5,
    text: 'Finish project',
    date: new Date('2025-06-06'),
    completed: true,
  },
];

const App = () => {
  // Load from localStorage or fallback to hardcoded current todos
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem('todos');
    const rawTodos = stored ? JSON.parse(stored) : currentTodo();
    return rawTodos.map((todo: any) => ({
      ...todo,
      date: new Date(todo.date),
    }));
  });

  // Toggle complete or incomplete
  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Delete todo
  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Add new todo
  const addTodo = (text: string, date: Date) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      date,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={removeTodo} />
    </>
  );
};

export default App;
