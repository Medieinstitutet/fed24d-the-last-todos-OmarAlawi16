import TodoItem from './TodoItem';
import type { Todo } from '../models/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <div className="todo-list-container">
      <h1>My Todo List</h1>
      <p>Press on the todo item to toggle completion status.</p>
      <ul className="todo-list">
        {todos
          // create a copy of the list and then sort by text
          .slice()
          .sort((a, b) => a.text.localeCompare(b.text))
          .map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
      </ul>
    </div>
  );
}

export default TodoList;
