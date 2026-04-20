# Setup - Pokédex v0.1.0

## Requisitos
- Node.js 20+
- npm 10+

## Instalación
```bash
npm install
```

## Ejecutar en desarrollo
```bash
npm run dev
```

## Build de producción
```bash
npm run build
npm run start
```

## Estructura principal
- `lib/axios.js`: instancia de Axios para PokeAPI.
- `pages/index.js`: listado estático de los primeros 151 Pokémon.
- `components/PokemonCard.js`: componente de tarjeta reutilizable.
- `pages/pokemon/[name].js`: página de detalle estática por Pokémon.
