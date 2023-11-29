// import { GetStaticProps } from "next";
// import React from "react";
// import prisma from "@/server/utils/prisma";

// const ResultPage: React.FC<{ pokemon }> = ({ pokemon }) => {
    
//     return <div>result</div>;
// }

// export default ResultPage;

// const getPokemonInOrder = async () => {
//     return prisma.pokemon.findMany({
//         orderBy: {
//             voteFor: { _count: "desc" },
//         },
//         select: {
//             id: true,
//             name: true,
//             spriteUrl: true,
//             _count: {
//                 select: { 
//                     voteAgainst: true, 
//                     voteFor: true, 
//                 },
//             },
//         },
//     });
// }

// export const getStaticProps: GetStaticProps = async () => {
//     const pokemonOrdered = await prisma.pokemon.findMany({
//         orderBy: {
//             voteFor: { _count: "desc" },
//         },
//         select: {
//             id: true,
//             name: true,
//             spriteUrl: true,
//             _count: {
//                 select: { 
//                     voteAgainst: true, 
//                     voteFor: true, 
//                 },
//             },
//         },
//     });
//     return {
//         props: {
//             pokemon: pokemonOrdered,
//         },
//     };
// };
