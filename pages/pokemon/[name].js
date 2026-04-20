import Head from 'next/head';
import Link from 'next/link';
import pokeApi from '../../lib/axios';

function formatStatName(value) {
  return value.replace('-', ' ');
}

/**
 * Vista de detalle para un Pokémon.
 */
export default function PokemonDetailPage({ pokemon }) {
  return (
    <>
      <Head>
        <title>{`${pokemon.name} | Pokédex`}</title>
        <meta
          name="description"
          content={`Detalles de ${pokemon.name}: tipos, habilidades y estadísticas.`}
        />
      </Head>

      <main className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <Link href="/" className="mb-6 inline-block text-sm font-semibold text-red-600 hover:underline">
            ← Volver a la Pokédex
          </Link>

          <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-start">
            <div className="rounded-xl bg-gray-50 p-4">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="mx-auto h-48 w-48 object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                #{String(pokemon.id).padStart(3, '0')}
              </p>
              <h1 className="text-3xl font-extrabold capitalize text-gray-900">
                {pokemon.name}
              </h1>

              <div className="mt-4">
                <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-700">Tipos</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase text-red-700"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-700">Habilidades</h2>
                <ul className="list-inside list-disc space-y-1 text-sm capitalize text-gray-700">
                  {pokemon.abilities.map((ability) => (
                    <li key={ability}>{ability.replace('-', ' ')}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-700">Estadísticas base</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {pokemon.stats.map((stat) => (
                <li key={stat.name} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="text-sm capitalize text-gray-700">{formatStatName(stat.name)}</span>
                  <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await pokeApi.get('pokemon', {
    params: {
      limit: 151,
      offset: 0,
    },
  });

  const paths = data.results.map((pokemon) => ({
    params: {
      name: pokemon.name,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await pokeApi.get(`pokemon/${params.name}`);

  const pokemon = {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other?.['official-artwork']?.front_default ||
      data.sprites.front_default,
    types: data.types.map((entry) => entry.type.name),
    abilities: data.abilities.map((entry) => entry.ability.name),
    stats: data.stats.map((entry) => ({
      name: entry.stat.name,
      value: entry.base_stat,
    })),
  };

  return {
    props: {
      pokemon,
    },
  };
}
