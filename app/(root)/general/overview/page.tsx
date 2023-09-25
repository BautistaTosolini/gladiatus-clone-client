'use client'

import { useContext } from 'react';

import { UserContext } from '../../layout';
import { useRouter } from 'next/navigation';
import CharacterCard from '@/components/cards/CharacterCard';

const Page = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const character = user?.character;

  if (!user || !character) {
    return router.push('/');
  }

  return (
    <div className='w-full mt-16 px-8 flex flex-col'>
      <div className='flex'>
        <CharacterCard
          character={character}
        />
      </div>
    </div>
  )
}

export default Page