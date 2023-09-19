'use client'

import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../layout';
import { useRouter } from 'next/navigation';
import CharacterCard from '@/components/cards/CharacterCard';

const Page = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const character = user?.character;
  const [isLoading, setIsLoading] = useState(true);

  if (!user || !character) {
    return router.push('/');
  }

  if (!character.onboarded) {
    return router.push('/onboard');
  }

  return (
    <div className='w-full mt-16 px-4 flex flex-col'>
      <div className='flex'>
        <CharacterCard
          character={character}
        />
      </div>
      <div className='flex'>

      </div>
    </div>
  )
}

export default Page