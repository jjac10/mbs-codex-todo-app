import Head from 'next/head';
import PokemonCard from '../components/PokemonCard';
import pokeApi from '../lib/axios';

/**
 * Home de Pokédex con los primeros 151 Pokémon.
 */
export default function HomePage({ pokemons }) {
  return (
    <>
      <Head>
        <title>Pokédex | Primera Generación</title>
        <meta
          name="description"
          content="Pokédex profesional con los primeros 151 Pokémon"
        />
      </Head>

      <main className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Pokédex
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Explora los primeros 151 Pokémon de Kanto.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await pokeApi.get('pokemon', {
    params: {
      limit: 151,
      offset: 0,
    },
  });

  const pokemons = data.results.map((pokemon, index) => {
    const id = index + 1;

    return {
      id,
      name: pokemon.name,
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
        `${id}.png`,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
}
