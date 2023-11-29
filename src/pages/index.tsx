import { PokemonField } from "@/components/pokemonField";
import { RouterOutputs } from "@/utils/trpc";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

export default function Home() {
    return (
        <div className="mx-auto px-2 h-screen w-screen flex flex-col justify-between items-center relative">
            <div className="text-2xl text-center pt-8">
                Wich Pokemon is Rounder?
            </div>
            <div className="border rounded p-4 md:p-8 flex justify-between items-center max-w-[658px] max-h-[344px] w-full h-[344px]">
                <PokemonField />
            </div>
            <div className="w-full text-xl text-center pb-2">
                <a href="https://github.com/DIMON710/pokemons">Github</a>
                {" | "}
                <Link href="result">Results</Link>
            </div>
        </div>
    );
}



const btn =
    "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export const PokemonListing: React.FC<{
    pokemon: RouterOutputs["getPokemonById"];
    vote: () => void;
}> = ({ pokemon, vote }) => {
    return (
        <div className="flex flex-col items-center relative">
            <Image
                style={{ imageRendering: "pixelated" }}
                src={pokemon.spriteUrl}
                alt={pokemon.name || "First pokemon"}
                width={256}
                height={256}
            />
            <div className="text-center capitalize mt-[-0.5rem] md:mt-[-1rem] mb-2">
                {pokemon.name}
            </div>
            <button className={btn} onClick={vote}>
                Rounder
            </button>
        </div>
    );
};
