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
      await axios.get(`${BASE_API_URL}/characters/enemy?zone=bandit`, { withCredentials: true })
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
          Bandit Settlement
        </h1>
        <div className='flex flex-row gap-4'>
          {enemies.map((enemy) => (
            <EnemyCard
            key={enemy.id}
            enemy={enemy}
            zone='bandit'
            />
            ))}
        </div>
        <DescriptionCard title='Zone Description'>
          The Bandit Camp stands as a defiant outpost amidst the untamed wilderness, a lawless sanctuary hidden away from the watchful gaze of authority. This forsaken enclave serves as a refuge for a motley crew of outlaws, renegades, and those who have chosen to live beyond the confines of Balenos laws.
        </DescriptionCard>
    </div>
  )
}

export default Page;