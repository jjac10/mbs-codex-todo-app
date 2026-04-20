import TodoItem from '@/src/components/TodoItem';
import type { Todo } from '@/src/types/todo';

export type TodoFilter = 'all' | 'active' | 'completed';

type TodoListProps = {
  todos: Todo[];
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

const FILTERS: { key: TodoFilter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'active', label: 'Activas' },
  { key: 'completed', label: 'Completadas' },
];

export default function TodoList({
  todos,
  currentFilter,
  onFilterChange,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-3 rounded-xl bg-gray-100 p-1">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => onFilterChange(filter.key)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              currentFilter === filter.key
                ? 'bg-white text-indigo-600 shadow'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {todos.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
          No hay tareas por aquí. ¡Agrega la primera y empieza con impulso! 🚀
        </p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
