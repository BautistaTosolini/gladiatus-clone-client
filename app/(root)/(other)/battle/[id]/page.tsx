'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { UserContext } from '@/app/(root)/layout';
import { BASE_API_URL } from '@/constants';
import FighterCard from '@/components/cards/FighterCard';
import { EnemyInterface } from '@/interfaces/enemy.interface';
import LoadingPage from '@/components/shared/LoadingPage';
import formatDateTime from '@/lib/utils/formatDateTime';
import { CharacterInterface } from '@/interfaces/character.interface';
import DescriptionCard from '@/components/cards/DescriptionCard';
import Image from 'next/image';
import { calculatePower } from '@/lib/utils/calculatePower';
import { ItemInterface } from '@/interfaces/item.interface';

interface BattleReport {
  createdAt: string;
  zone: string;
  rounds: [
      {
        attackerHP: number;
        defenderHP: number;
        events: string[];
      }
    ]
  defender: {
    agility: number;
    charisma: number;
    strength: number;
    endurance: number;
    dexterity: number;
    intelligence: number;
    image: string;
    name: string;
    level: number;
    crowns?: number[];
    xp?: number[];
    gender: string;
    power: number;
  };
  result: {
    attackerFinalHealth: number;
    defenderFinalHealth: number;
    attackerHealth: number;
    defenderHealth: number;
    attackerTotalDamage: number;
    defenderTotalDamage: number;
    crownsDrop: number;
    experienceDrop: number;
    winner: string;
    honourEarned: number;
    honourLost: number;
  };
  attacker: CharacterInterface;
  items: ItemInterface[];
}

const Page = ({ params }: { params: { id: string } }) => {
  const user = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [battleReport, setBattleReport] = useState<BattleReport | null>(null);

  const defender = battleReport?.defender;
  const attacker = battleReport?.attacker;

  useEffect(() => {
    const id = params.id;

    const fetchBattleReport = async () => {
      await axios.get(`${BASE_API_URL}/api/characters/battle/${id}`, { withCredentials: true })
        .then((response) => {
          const battleReport = response.data;

          setBattleReport(battleReport);
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

  if (!battleReport || !defender || !attacker) {
    return (
      <div className='px-8'>
        <h2 className='text-md font-semibold border-b-[3px] border-cream2 bg-cream2 px-2 mt-16 info-card text-brown2'>
          No results
        </h2>
      </div>
    )
  }

  const isEnemy = 'id' in battleReport.defender
  const battleDate = new Date(battleReport!.createdAt);

  return (
    <div className='w-full flex flex-col mt-16 mb-4 px-4 gap-4'>
      <div className='w-full'>
        <div className={`w-full text-lg flex items-center justify-center h-12 font-semibold text-cream2 ${battleReport.result.winner === user?.character._id ? 'green-card' : 'red-card'}`}>
          {battleReport.result.winner === attacker._id ? `Winner: ${attacker.name}` : `Winner: ${defender.name}`}
        </div>
      </div>

      {isEnemy ? 
      <DescriptionCard
      title='Rewards'
      >
        <p className='text-sm px-2 py-1 flex items-center gap-1'>
          <span className='font-semibold'>{attacker.name}</span> earned {battleReport.result.crownsDrop} 
          <Image 
            src={'/images/crowns.png'}
            width={12}
            height={12}
            alt='crowns'
          />
        </p>
        <p className='text-sm px-2 py-1'>
          <span className='font-semibold'>{attacker.name}</span> has received {battleReport.result.experienceDrop} experience.
        </p>
        {battleReport.items.length > 0 &&
          <div className='text-sm px-2 py-1 gap-1'>
            <p>
              <span className='font-semibold'>{defender.name}</span>  dropped:
            </p>
            {battleReport.items.map((drop) => (
              <p 
                className='px-2 flex gap-2 py-1'
                key={drop._id}
              >
                {drop.name}
                <Image 
                  className='rounded-sm'
                  src={`/items/${drop.image}.jpg`}
                  alt={drop.name}
                  width={20}
                  height={20}
                />
              </p>
            ))}
          </div>
        }
      </DescriptionCard>
    :
      <DescriptionCard
        title='Rewards'
      >
        {battleReport.result.winner === attacker.name ?
        <>
          <p className='text-sm px-2 py-1 flex items-center gap-1'>
            <span className='font-semibold'>{attacker.name}</span> earned {battleReport.result.honourEarned} honour. 
          </p>
          <p className='text-sm px-2 py-1'>
            <span className='font-semibold'>{defender.name}</span> has lost {battleReport.result.honourLost * -1} honour.
          </p>
        </>
        :
        <>
          <p className='text-sm px-2 py-1 flex items-center gap-1'>
            <span className='font-semibold'>{defender.name}</span> earned {battleReport.result.honourEarned} honour. 
          </p>
          <p className='text-sm px-2 py-1'>
            <span className='font-semibold'>{attacker.name}</span> has lost {battleReport.result.honourLost * -1} honour.
          </p>
        </>
        }
      </DescriptionCard>
    
    }

      <div className='flex flex-row justify-between items-center w-full px-8'>
        <FighterCard
          image={attacker.gender} 
          level={attacker.level}
          name={attacker.name}
          strength={attacker.strength}
          endurance={attacker.endurance}
          agility={attacker.agility}
          dexterity={attacker.dexterity}
          intelligence={attacker.intelligence}
          charisma={attacker.charisma}
          power={calculatePower(attacker)}
        />

        <div className='text-lg text-red3 font-bold items-center flex flex-col'>
        <Image 
          src={`/images/fight.png`}
          width={55}
          height={22}
          alt='fight'
        />
          Vs
        </div>

        <FighterCard
          image={isEnemy ? defender.image : defender.gender} 
          level={defender.level}
          name={defender.name}
          strength={defender.strength}
          endurance={defender.endurance}
          agility={defender.agility}
          dexterity={defender.dexterity}
          intelligence={defender.intelligence}
          charisma={defender.charisma}
          power={defender.power}
          zone={battleReport.zone}
          isEnemy={isEnemy}
        />
      </div>

      <DescriptionCard
        title={`Statistics - ${formatDateTime(battleDate)}`}
      >
        <div className='px-4 w-full flex justify-between'>
          <div className='flex flex-col justify-center text-sm'>
            <span className='font-semibold'>Name:</span>
            <span>{attacker.name}</span>
            <span>{defender.name}</span>
          </div>
          <div className='flex flex-col items-center justify-center text-sm'>
            <span className='font-semibold'>Damage Points:</span>
            <span>{battleReport.result.attackerTotalDamage}</span>
            <span>{battleReport.result.defenderTotalDamage}</span>
          </div>
          <div className='flex flex-col items-center justify-center text-sm'>
            <span className='font-semibold'>Health Points:</span>
            <span>{battleReport.result.attackerHealth}</span>
            <span>{battleReport.result.defenderHealth}</span>
          </div>
        </div>
      </DescriptionCard>

      <div className='w-full info-card'>
        <h2 className='text-md font-semibold border-b-[3px] border-cream2 bg-cream2 px-2 text-brown2'>
          Battle Report
        </h2>
        {battleReport.rounds.map((round, index) => (
          <>
            <h3 className='text-sm font-semibold border-b-[3px] border-cream2 bg-[#f3d48c] px-2 text-center text-brown2'>
              Round {index + 1}
            </h3>
            {round.events.map((event, index) => (
              <p
                key={`${event}-${index}`}
                className={`${index === 1 || index === 3 ? 'bg-cream' : 'bg-[#dbc389]'} text-sm p-2 text-brown2`}
              >
                {event}
              </p>
            ))}
          </>
        ))}
      </div>
    </div>
  )
}

export default Page;