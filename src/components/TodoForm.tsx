import { useState } from 'react';

interface TodoFormProps {
  onAdd: (text: string, date: Date) => void;
}

function TodoForm({ onAdd }: TodoFormProps) {
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoDate, setNewTodoDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim() !== '') {
      onAdd(
        newTodoText.trim(),
        newTodoDate ? new Date(newTodoDate) : new Date()
      );
      setNewTodoText('');
      setNewTodoDate('');
    }
  };

  return (
    <div className="todo-form-container">
      <h2>Add a new todo</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <input
            type="text"
            value={newTodoText}
            onChange={e => setNewTodoText(e.target.value)}
            className="todo-input"
            placeholder="Add a new todo..."
            name="todoText"
          />
          <input
            type="date"
            value={newTodoDate}
            onChange={e => setNewTodoDate(e.target.value)}
            className="todo-date"
            name="todoDate"
          />
        </div>
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
