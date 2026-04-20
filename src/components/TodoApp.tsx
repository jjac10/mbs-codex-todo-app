'use client';

import { useMemo, useState } from 'react';

import TodoInput from '@/src/components/TodoInput';
import TodoList, { type TodoFilter } from '@/src/components/TodoList';
import type { Todo } from '@/src/types/todo';

const STORAGE_KEY = 'todos-v1';

const getInitialTodos = (): Todo[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as Todo[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);
  const [filter, setFilter] = useState<TodoFilter>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prevTodos) => {
      const updated = [newTodo, ...prevTodos];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) => {
      const updated = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => {
      const updated = prevTodos.filter((todo) => todo.id !== id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [todos, filter]);

  return (
    <section className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-lg sm:p-6">
      <header className="mb-5 space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Mi lista de tareas</h1>
        <p className="text-sm text-gray-500">
          Organiza tu día con un flujo simple y enfocado.
        </p>
      </header>

      <div className="space-y-5">
        <TodoInput onAddTodo={addTodo} />
        <TodoList
          todos={filteredTodos}
          currentFilter={filter}
          onFilterChange={setFilter}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>
    </section>
  );
}
