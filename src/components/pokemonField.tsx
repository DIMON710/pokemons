import { PokemonListing } from "@/pages";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export const PokemonField: React.FC = () => {
    const [ids, updateIds] = useState(getOptionsForVote());
    const [first, second] = ids;
    const firstPokemon = trpc.getPokemonById.useQuery(
        { id: first },
        {
            keepPreviousData: true,
        }
    );
    const secondPokemon = trpc.getPokemonById.useQuery(
        { id: second },
        {
            keepPreviousData: true,
        }
    );
    const { mutate } = trpc.castVote.useMutation();

    const voteForRoundest = (selected: number) => {
        if (selected === first) {
            mutate({ votedForId: first, votedAgainstId: second });
        } else {
            mutate({ votedForId: second, votedAgainstId: first });
        }
        updateIds(getOptionsForVote());
    };

    if (!firstPokemon.data || !secondPokemon.data) return <img src="/rings.svg" className="w-64 h-64 mx-auto" alt="" />
    return (
        <>
            <PokemonListing
                pokemon={firstPokemon?.data}
                vote={() => voteForRoundest(first)}
            />
            <div className="p-8">Vs</div>
            <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => voteForRoundest(second)}
            />
            <div className="p-2" />
        </>
    );
};
