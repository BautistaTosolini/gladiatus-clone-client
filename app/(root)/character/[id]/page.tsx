'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { UserContext } from '@/app/(root)/layout';
import { BASE_API_URL } from '@/constants';
import LoadingPage from '@/components/shared/LoadingPage';
import { CharacterInterface } from '@/interfaces/character.interface';
import CharacterCard from '@/components/cards/CharacterCard';

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const user = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState<CharacterInterface | null>(null);

  useEffect(() => {
    const id = params.id;

    const fetchBattleReport = async () => {
      await axios.get(`${BASE_API_URL}/characters/${id}`, { withCredentials: true })
        .then((response) => {
          const character = response.data;

          console.log(character)

          setCharacter(character);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        })
    }

    fetchBattleReport();
  }, [params.id])

  if (isLoading) {
    return <LoadingPage />
  }

  if (!character) {
    return (
      <div className='px-4'>
        <h2 className='text-md font-semibold border-b-[3px] border-cream2 bg-cream2 px-2 mt-16 info-card'>
          No results
        </h2>
      </div>
    )
  }


  return (
    <div className='w-full mt-16 px-4 flex flex-col'>
      <div className='flex'>
        <CharacterCard
          character={character}
        />
      </div>
    </div>
  )
}

export default Page;