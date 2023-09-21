'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import EnemyCard from '@/components/cards/EnemyCard';
import LoadingPage from '@/components/shared/LoadingPage';
import { BASE_API_URL } from '@/constants';
import { EnemyInterface } from '@/interfaces/enemy.interface';
import DescriptionCard from '@/components/cards/DescriptionCard';

const Page = () => {
  const router = useRouter();
  const [enemies, setEnemies] = useState<EnemyInterface[] | null>(null);

  useEffect(() => {
    const fetchEnemies = async () => {
      await axios.get(`${BASE_API_URL}/characters/enemy?zone=crypt`, { withCredentials: true })
        .then((response) => {
          const enemies = response.data;

          setEnemies(enemies);
        })
        .catch(() => {
          router.push('/overview')
        });
    }

    fetchEnemies();
  }, [router])

  if (!enemies) {
    return <LoadingPage />
  }

  return (
    <div className='w-full mt-16 px-4 flex flex-col gap-4'>
        <h1 className='text-xl font-bold border-b-[3px] border-red text-center text-red'>
          Ancient Crypt
        </h1>
        <div className='flex flex-row gap-4'>
          {enemies.map((enemy) => (
            <EnemyCard
            key={enemy.id}
            enemy={enemy}
            zone='crypt'
            />
            ))}
        </div>
        <DescriptionCard title='Zone Description'>
          The Ancient Crypt of Grim Shadows is a foreboding and treacherous place, where death&apos;s presence is palpable, and the restless spirits of the deceased linger on as malevolent draugrs. Deep beneath the earth&apos;s surface, this crypt holds a grim and chilling history.
        </DescriptionCard>
    </div>
  )
}

export default Page;