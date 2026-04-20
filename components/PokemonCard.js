import Link from 'next/link';

/**
 * Tarjeta de presentación de Pokémon en el listado principal.
 */
export default function PokemonCard({ pokemon }) {
  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-4 flex h-28 items-center justify-center rounded-xl bg-gray-50 p-3">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        #{String(pokemon.id).padStart(3, '0')}
      </p>
      <h2 className="mt-1 text-lg font-bold capitalize text-gray-900 group-hover:text-red-600">
        {pokemon.name}
      </h2>
    </Link>
  );
}
