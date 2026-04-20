import TodoApp from '@/src/components/TodoApp';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-6xl justify-center">
        <TodoApp />
      </div>
    </main>
  );
}
