import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { RouterOutputs, trpc } from "@/utils/trpc";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type React from "react";

const btn =
    "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export default function Home() {
    const [ids, updateIds] = useState(getOptionsForVote());
    const [first, second] = ids;
    const firstPokemon = trpc.getPokemonById.useQuery({ id: first });
    const secondPokemon = trpc.getPokemonById.useQuery({ id: second });
    const { mutate } = trpc.castVote.useMutation();

    if (firstPokemon.isLoading || secondPokemon.isLoading) null;

    const voteForRoundest = (selected: number) => {
        if (selected === first) {
            mutate({ votedForId: first, votedAgainstId: second });
        } else {
            mutate({ votedForId: second, votedAgainstId: first });
        }
        updateIds(getOptionsForVote());
    };
    const dataLoaded =
        !firstPokemon.isLoading &&
        !secondPokemon.isLoading &&
        firstPokemon.data &&
        secondPokemon.data;

    return (
        <div className="mx-auto px-2 h-screen w-screen flex flex-col justify-between items-center relative">
            <div className="text-2xl text-center pt-8">Wich Pokemon is Rounder?</div>
            {dataLoaded && (
                <div className="border rounded p-4 md:p-8 flex justify-between items-center max-w-2xl">
                    <PokemonListing
                        pokemon={firstPokemon.data}
                        vote={() => voteForRoundest(first)}
                    />
                    <div className="p-8">Vs</div>
                    <PokemonListing
                        pokemon={secondPokemon.data}
                        vote={() => voteForRoundest(second)}
                    />
                    <div className="p-2" />
                </div>
            )}
            {!dataLoaded && <img src="/rings.svg" className="w-48" />}

            <div className="w-full text-xl text-center pb-2">
                <a href="https://github.com/DIMON710/pokemons">Github</a>
                {" | "}
                <Link href="result">Results</Link>
            </div>
        </div>
    );
}

const PokemonListing: React.FC<{
    pokemon: RouterOutputs["getPokemonById"];
    vote: () => void;
}> = ({ pokemon, vote }) => {
    return (
        <div className="flex flex-col items-center relative">
            <Image
                src={pokemon.spriteUrl}
                alt={pokemon.name || "First pokemon"}
                width={256}
                height={256}
            />
            <div className="text-center capitalize mt-[-1rem] md:mt-[-2rem] mb-2">
                {pokemon.name}
            </div>
            <button className={btn} onClick={vote}>
                Rounder
            </button>
        </div>
    );
};
