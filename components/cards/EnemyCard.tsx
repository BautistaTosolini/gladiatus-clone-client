'use client';

import { EnemyInterface } from '@/interfaces/enemy.interface'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_API_URL } from '@/constants';

interface EnemyCardProps {
  enemy: EnemyInterface;
  zone: string;
}

const EnemyCard = ({ enemy, zone }: EnemyCardProps) => {
  const router = useRouter();

  const onClick = async () => {
    await axios.post(`${BASE_API_URL}/api/characters/battle?zone=${zone}&enemy=${enemy.image}`, {}, { withCredentials: true })
      .then((response) => {
        const battleReport = response.data;

        router.push(`/battle/${battleReport._id}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  return (
      <div className='w-38 flex flex-col items-center gap-2 drop-shadow-lg z-[998]'>
        <h2 className='red-card text-center font-semibold text-cream2 w-full'>
          {enemy.name}
        </h2>
        <div>
          <HoverCard closeDelay={0}>
            <HoverCardTrigger asChild>
              <Image 
                src={`/enemies/${zone}/${enemy.image}.jpg`}
                width={135}
                height={156}
                alt={enemy.image}
              />
            </HoverCardTrigger>
            <HoverCardContent>
              <div className='red-card flex flex-col min-w-[130px] px-2 text-cream2 text-xs'>

                <span className='font-semibold text-sm'>
                  {enemy.name}
                </span>

                <span className='flex justify-between'>
                  Level:
                  <span>
                    {enemy.level ? `${enemy.level[0]} - ${enemy.level[enemy.level.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Experience:
                  <span>
                    {enemy.xp ? `${enemy.xp[0]} - ${enemy.xp[enemy.xp.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Crowns:
                  <span>
                    {enemy.crowns ? `${enemy.crowns[0]} - ${enemy.crowns[enemy.crowns.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Strength:
                  <span>
                    {enemy.strength ? `${enemy.strength[0]} - ${enemy.strength[enemy.strength.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Endurance:
                  <span>
                    {enemy.endurance ? `${enemy.endurance[0]} - ${enemy.endurance[enemy.endurance.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Dexterity:
                  <span>
                    {enemy.dexterity ? `${enemy.dexterity[0]} - ${enemy.dexterity[enemy.dexterity.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Agility:
                  <span>
                    {enemy.agility ? `${enemy.agility[0]} - ${enemy.agility[enemy.agility.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Intelligence:
                  <span>
                    {enemy.intelligence ? `${enemy.intelligence[0]} - ${enemy.intelligence[enemy.intelligence.length - 1]}` : '?'}
                  </span>
                </span>

                <span className='flex justify-between'>
                  Charisma:
                  <span>
                    {enemy.charisma ? `${enemy.charisma[0]} - ${enemy.charisma[enemy.charisma.length - 1]}` : '?'}
                  </span>
                </span>

              </div>  
            </HoverCardContent>
          </HoverCard>
        </div>
        <Button
          className='fight-button w-full h-7 font-semibold hover:brightness-110 hover:bg-brown text-brown2'
          onClick={onClick}
        >
          Fight
        </Button>
      </div>
  )
}

export default EnemyCard