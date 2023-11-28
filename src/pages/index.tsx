import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { RouterOutputs, trpc } from "@/utils/trpc";
import Image from "next/image";
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
            mutate({ voteFor: first, voteAgainst: second });
        } else {
            mutate({ voteFor: second, voteAgainst: first });
        }
        updateIds(getOptionsForVote());
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <div className="text-2xl text-center">Wich Pokemon is Rounder?</div>
            <div className="p-2" />
            <div className="border rounded p-8 flex justify-between max-w-2xl items-center min-w-[658px] min-h-[344px]">
                {!firstPokemon.isLoading &&
                    !secondPokemon.isLoading &&
                    firstPokemon.data &&
                    secondPokemon.data && (
                        <>
                            <PokemonListing
                                pokemon={firstPokemon.data}
                                vote={() => voteForRoundest(first)}
                            />
                            <div className="p-8">Vs</div>
                            <PokemonListing
                                pokemon={secondPokemon.data}
                                vote={() => voteForRoundest(second)}
                            />
                        </>
                    )}
                <div className="p-2" />
            </div>
            <div className="absolute bottom-0 w-full text-xl text-center pb-2"><a href="https://github.com/DIMON710/pokemons">Github</a></div>
        </div>
    );
}

const PokemonListing: React.FC<{
    pokemon: RouterOutputs["getPokemonById"];
    vote: () => void;
}> = ({ pokemon, vote }) => {
    return (
        <div className="flex flex-col items-center relative">
            {pokemon.sprites.front_default && (
                <Image
                    layout="fixed"
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name || "First pokemon"}
                    width={256}
                    height={256}
                />
            )}
            <div className="text-center capitalize mt-[-2rem]">
                {pokemon.name}
            </div>
            <button className={btn} onClick={vote}>
                Rounder
            </button>
        </div>
    );
};
