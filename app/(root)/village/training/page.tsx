'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

import { UserContext } from '@/app/(root)/layout';
import { BASE_API_URL } from '@/constants';
import StatCard from '@/components/cards/StatCard';
import DescriptionCard from '@/components/cards/DescriptionCard';

const calculateCrowns = (stat: number) => Math.pow(stat, 2) + stat + 1;

const Page = () => {
  const router = useRouter();
  const user = useContext(UserContext);

  const [character, setCharacter] = useState(user?.character);

  if (!user || !character) {
    return router.push('/');
  }

  const onClick = async (stat: string) => {
    await axios.put(`${BASE_API_URL}/api/characters/train`, { stat }, { withCredentials: true })
      .then((response) => {
        const updatedCharacter = response.data;

        setCharacter(updatedCharacter);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
  }

  return (
    <div className='w-full mt-16 px-8 gap-4 flex flex-col'>
      <div className='flex gap-4'>
        <Image 
          width={168}
          height={194}
          src={`/images/barracks.jpg`}
          alt='barrakcs'
        />
        <DescriptionCard
          title='Training'
        >
          <p>
            Within the city&apos;s barracks, you can observe robust soldiers training, who are willing to impart their skills in exchange for a generous sum of crowns.
          </p>
          <p className='flex items-center gap-1'>
            Your balance: {character.crowns} 
            <Image 
              src={'/images/crowns.png'}
              width={12}
              height={12}
              alt='crowns'
            />
          </p>
        </DescriptionCard>
      </div>
      <div className='brown-card flex flex-col text-sm rounded-sm'>

        <StatCard 
          statName='Strength'
          statValue={character.strength}
          crowns={calculateCrowns(character.strength)}
          onClick={() => onClick('strength')}
          characterCrowns={character.crowns}
        />

        <StatCard 
          statName='Endurance'
          statValue={character.endurance}
          crowns={calculateCrowns(character.endurance)}
          onClick={() => onClick('endurance')}
          characterCrowns={character.crowns}
        />

        <StatCard 
          statName='Agility'
          statValue={character.agility}
          crowns={calculateCrowns(character.agility)}
          onClick={() => onClick('agility')}
          characterCrowns={character.crowns}
        />

        <StatCard 
          statName='Dexterity'
          statValue={character.dexterity}
          crowns={calculateCrowns(character.dexterity)}
          onClick={() => onClick('dexterity')}
          characterCrowns={character.crowns}
        />

        <StatCard 
          statName='Intelligence'
          statValue={character.intelligence}
          crowns={calculateCrowns(character.intelligence)}
          onClick={() => onClick('intelligence')}
          characterCrowns={character.crowns}
        />

        <StatCard 
          statName='Charisma'
          statValue={character.charisma}
          crowns={calculateCrowns(character.charisma)}
          onClick={() => onClick('charisma')}
          characterCrowns={character.crowns}
          last
        />

      </div>
    </div>
  )
}

export default Page