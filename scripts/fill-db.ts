import { PokemonClient } from "pokenode-ts";
import prisma from '@/server/utils/prisma';
const doBackfill = async () => {
    const pokeApi = new PokemonClient();

    const allPokemon = await pokeApi.listPokemons(0, 493);

    const formattedPokemon = allPokemon.results.map(p => ({ name: p.name }))
    console.log('pokemon?' + allPokemon);
    
    const creation = prisma.pokemon.createMany({
        data: 
    })
}
doBackfill();