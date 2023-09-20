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
  enemy: {
    agility: number;
    charisma: number;
    strength: number;
    endurance: number;
    dexterity: number;
    intelligence: number;
    image: string;
    name: string;
    level: number;
    crowns: number[];
    xp: number[];
  };
  result: {
    attackerFinalHealth: number;
    defenderFinalHealth: number;
    attackerHealth: number;
    defenderHealth: number;
    attackerTotalDamage: number;
    defenderTotalDamage: number;
    crownsDrop: number;
    xpDrop: number;
    winner: string;
  };
  fighter: CharacterInterface;
}

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const user = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [battleReport, setBattleReport] = useState<BattleReport | null>(null);
  const enemy = battleReport?.enemy;

  useEffect(() => {
    const id = params.id;

    const fetchBattleReport = async () => {
      await axios.get(`${BASE_API_URL}/characters/battle/${id}`, { withCredentials: true })
        .then((response) => {
          const battleReport = response.data;

          console.log(battleReport)

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

  if (!battleReport || !enemy) {
    return (
      <div className='px-4'>
        <h2 className='text-md font-semibold border-b-[3px] border-cream2 bg-cream2 px-2 mt-16 info-card'>
          No results
        </h2>
      </div>
    )
  }

  
  const battleDate = new Date(battleReport!.createdAt);

  return (
    <div className='w-full flex flex-col mt-16 mb-4 px-4 gap-4'>
      <div className='w-full'>
        <div className={`w-full text-lg flex items-center justify-center h-12 font-semibold text-cream2 ${battleReport.result.winner === battleReport.fighter.name ? 'green-card' : 'red-card'}`}>
          {battleReport.result.winner === battleReport.fighter.name ? `Winner: ${battleReport.fighter.name}` : `Winner: ${enemy.name}`}
        </div>
      </div>
      <div className='w-full info-card'>
        <h2 className='text-md font-semibold border-b-[3px] border-cream2 bg-cream2 px-2'>
          Rewards
        </h2>
        <p className='text-sm px-2 py-1'>
          <span className='font-semibold'>{battleReport.fighter.name}</span> earned {battleReport.result.crownsDrop} crowns.
        </p>
        <p className='text-sm px-2 py-1'>
          <span className='font-semibold'>{battleReport.fighter.name}</span> has received {battleReport.result.xpDrop} experience.
        </p>  
      </div>
      <div className='flex flex-row justify-between items-center w-full px-2'>
        <FighterCard
          image={battleReport.fighter.gender} 
          level={battleReport.fighter.level}
          name={battleReport.fighter.name}
          strength={battleReport.fighter.strength}
          endurance={battleReport.fighter.endurance}
          agility={battleReport.fighter.agility}
          dexterity={battleReport.fighter.dexterity}
          intelligence={battleReport.fighter.intelligence}
          charisma={battleReport.fighter.charisma}
        />

        <div className='text-xl font-bold'>
          Vs
        </div>

        <FighterCard
          image={enemy.image} 
          level={enemy.level}
          name={enemy.name}
          strength={enemy.strength}
          endurance={enemy.endurance}
          agility={enemy.agility}
          dexterity={enemy.dexterity}
          intelligence={enemy.intelligence}
          charisma={enemy.charisma}
          zone={battleReport.zone}
          isEnemy
        />
      </div>
      <div className='w-full info-card'>
        <h2 className='text-md font-semibold border-b-[3px] border-cream2 bg-cream2 px-2'>
          Statistics - <span className='text-sm'>{formatDateTime(battleDate)}</span>
        </h2>
        <div className='px-4 w-full flex justify-between'>
          <div className='flex flex-col justify-center text-sm'>
            <span className='font-semibold'>Name:</span>
            <span>{battleReport.fighter.name}</span>
            <span>{enemy.name}</span>
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
      </div>
      <div className='w-full info-card'>
        <h2 className='text-md font-semibold border-b-[3px] border-cream2 bg-cream2 px-2'>
          Battle Report:
        </h2>
        {battleReport.rounds.map((round, index) => (
          <>
            <h3 className='text-sm font-semibold border-b-[3px] border-cream2 bg-[#f3d48c] px-2 text-center'>
              Round: {index + 1}
            </h3>
            {round.events.map((event, index) => (
              <p
                key={`${event}-${index}`}
                className={`${index === 1 || index === 3 ? 'bg-cream' : 'bg-[#dbc389]'} text-sm p-2`}
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