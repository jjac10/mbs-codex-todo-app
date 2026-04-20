import type { Todo } from '@/src/types/todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${
          todo.completed
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-gray-400 bg-white text-transparent hover:border-indigo-500'
        }`}
      >
        ✓
      </button>

      <span
        className={`flex-1 break-words text-sm sm:text-base ${
          todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'
        }`}
      >
        {todo.text}
      </span>

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label="Eliminar tarea"
        className="text-gray-400 transition hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      >
        ✕
      </button>
    </li>
  );
}
