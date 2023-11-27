import { getOptionsForVote } from "@/utils/getRandomPokemon";

export default function Home({ first, second }: { first: number, second: number }) {
  
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Wich Pokemon is Rounder?</div>
      <div className="p-2"/>
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        {first && <div className="w-16 h-16 bg-red-800">{first}</div>}
        <div className="p-8">Vs</div>
        {second && <div className="w-16 h-16 bg-red-800">{second}</div>}
      </div>
    </div>
  )
}

export const getServerSideProps = () => {
  const [first, second] = getOptionsForVote();
  return {
    props: {
      first,
      second
    }
  }
}