'use client';

import { EnemyInterface } from "@/interfaces/enemy.interface"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card"
import Image from "next/image"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_API_URL } from "@/constants";

interface EnemyCardProps {
  enemy: EnemyInterface;
  zone: string;
}

const EnemyCard = ({ enemy, zone }: EnemyCardProps) => {
  const router = useRouter();

  const onClick = async () => {
    await axios.post(`${BASE_API_URL}/characters/battle?zone=${zone}&enemy=${enemy.image}`, {}, { withCredentials: true })
      .then((response) => {
        const battleReport = response.data;

        router.push(`/battle/${battleReport._id}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  return (
      <div className='orange-card w-38 flex flex-col items-center p-2 gap-2 drop-shadow-lg z-[998]'>
        <h2 className='red-card text-center font-semibold text-cream2 w-full'>
          {enemy.name}
        </h2>
        <div>
          <HoverCard closeDelay={150}>
            <HoverCardTrigger asChild>
              <Image 
                src={`/enemies/grimwood/${enemy.image}.jpg`}
                width={135}
                height={156}
                alt={enemy.image}
              />
            </HoverCardTrigger>
            <HoverCardContent>
              <div className='red-card flex flex-col min-w-[160px] px-2'>
                <span className='font-semibold text-cream2'>
                  {enemy.name}
                </span>
                <span className='flex justify-between text-cream2 text-sm'>
                  Level:
                  <span>
                    {enemy.level ? `${enemy.level[0]} - ${enemy.level[enemy.level.length - 1]}` : '?'}
                  </span>
                </span>
                <span className='flex justify-between text-cream2 text-sm'>
                  Experience:
                  <span>
                    {enemy.xp ? `${enemy.xp[0]} - ${enemy.xp[enemy.xp.length - 1]}` : '?'}
                  </span>
                </span>
                <span className='flex justify-between text-cream2 text-sm'>
                  Crowns:
                  <span>
                    {enemy.crowns ? `${enemy.crowns[0]} - ${enemy.crowns[enemy.crowns.length - 1]}` : '?'}
                  </span>
                </span>
                <span className='flex justify-between text-cream2 text-sm'>
                  Strength:
                  <span>
                    {enemy.strength ? `${enemy.strength[0]} - ${enemy.strength[enemy.strength.length - 1]}` : '?'}
                  </span>
                </span>
                <span className='flex justify-between text-cream2 text-sm'>
                  Endurance:
                  <span>
                    {enemy.endurance ? `${enemy.endurance[0]} - ${enemy.endurance[enemy.endurance.length - 1]}` : '?'}
                  </span>
                </span>
                <span className='flex justify-between text-cream2 text-sm'>
                  Dexterity:
                  <span>
                    {enemy.dexterity ? `${enemy.dexterity[0]} - ${enemy.dexterity[enemy.dexterity.length - 1]}` : '?'}
                  </span>
                </span>
                <span className='flex justify-between text-cream2 text-sm'>
                  Agility:
                  <span>
                    {enemy.agility ? `${enemy.agility[0]} - ${enemy.agility[enemy.agility.length - 1]}` : '?'}
                  </span>
                </span>
                <span className='flex justify-between text-cream2 text-sm'>
                  Intelligence:
                  <span>
                    {enemy.intelligence ? `${enemy.intelligence[0]} - ${enemy.intelligence[enemy.intelligence.length - 1]}` : '?'}
                  </span>
                </span>
                <span className='flex justify-between text-cream2 text-sm'>
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
          className='w-full h-9 bg-red text-cream2 font-semibold hover:bg-red2'
          onClick={onClick}
        >
          Fight
        </Button>
      </div>
  )
}

export default EnemyCard