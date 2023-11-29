import { z } from 'zod';
import { procedure, router } from '../trpc';
import prisma from '../utils/prisma';

export const appRouter = router({
  getPokemonById: procedure
    .input(
      z.object({ id: z.number() }),
    )
    .query(async ({ input }) => {
      const pokemon = await prisma.pokemon.findFirst({where: {id: input.id}});
      return {name: pokemon?.name, spriteUrl: pokemon?.spriteUrl };
    }),
  castVote: procedure
    .input(z.object({ votedForId: z.number(), votedAgainstId: z.number() }))
    .mutation(async ({ input }) => {
      const voteInDb = await prisma.vote.create({ data: {
          ...input
      } })
      
      return { success: true, vote: voteInDb };
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;