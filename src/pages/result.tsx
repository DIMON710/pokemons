import { GetStaticProps } from "next";
import React from "react";
import prisma from "@/server/utils/prisma";
import { AsyncReturnType } from "@/utils/ts-bs";
import Image from "next/image";

const getPokemonInOrder = async () => {
    return prisma.pokemon.findMany({
        orderBy: {
            voteFor: { _count: "desc" },
        },
        select: {
            id: true,
            name: true,
            spriteUrl: true,
            _count: {
                select: {
                    voteAgainst: true,
                    voteFor: true,
                },
            },
        },
    });
};

type PokemonQueryResult = AsyncReturnType<typeof getPokemonInOrder>;

const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
    const { voteFor, voteAgainst } = pokemon._count;
    if (voteFor + voteAgainst === 0) return 0;

    return (voteFor / (voteFor + voteAgainst)) * 100;
}

const PokemonListing: React.FC<{ pokemon: PokemonQueryResult[number] }> = ({
    pokemon,
}) => {
    return (
        <div className="flex border-b p-2 items-center justify-between">
            <div className="flex items-center">
                <Image
                    src={pokemon.spriteUrl}
                    alt={pokemon.name || "First pokemon"}
                    width={64}
                    height={64}
                />
                <div className="capitalize">{pokemon.name}</div>
            </div>
            <div className="pr-4">{generateCountPercent(pokemon) + "%"}</div>
        </div>
    );
};

const ResultPage: React.FC<{ pokemon: PokemonQueryResult }> = ({ pokemon }) => {
    return (
        <div className="flex flex-col items-center px-2 mx-auto">
            <h2 className="text-2xl p-4">Result</h2>
            <div className="flex flex-col w-full max-w-2xl border">
                {pokemon.sort((a, b) => generateCountPercent(b) - generateCountPercent(a)).map((currentPokemon, index) => (
                    <PokemonListing key={index} pokemon={currentPokemon} />
                ))}
            </div>
        </div>
    );
};

export default ResultPage;

export const getStaticProps: GetStaticProps = async () => {
    const pokemonOrdered = await getPokemonInOrder();

    return {
        props: {
            pokemon: pokemonOrdered,
        },
        revalidate: 60,
    };
};
