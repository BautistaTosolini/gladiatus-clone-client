'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import EnemyCard from '@/components/cards/EnemyCard';
import LoadingPage from '@/components/shared/LoadingPage';
import { BASE_API_URL } from '@/constants';
import { EnemyInterface } from '@/interfaces/enemy.interface';

const Page = () => {
  const router = useRouter();
  const [enemies, setEnemies] = useState<EnemyInterface[] | null>(null);

  useEffect(() => {
    const fetchEnemies = async () => {
      await axios.get(`${BASE_API_URL}/characters/enemy?zone=grimwood`, { withCredentials: true })
        .then((response) => {
          const enemies = response.data;

          setEnemies(enemies);
        })
        .catch(() => {
          router.push('/home')
        });
    }

    fetchEnemies();
  }, [router])

  if (!enemies) {
    return <LoadingPage />
  }

  return (
    <div className='w-full mt-16 px-4 flex flex-col'>
      <div>
        <h1 className='text-xl font-bold mb-4 border-b-[3px] border-red text-center text-red'>
          Grimwood
        </h1>
        <div className='flex flex-row gap-4'>
          {enemies.map((enemy) => (
            <EnemyCard
            key={enemy.id}
            enemy={enemy}
            zone='grimwood'
            />
            ))}
        </div>
        <div className='w-full info-card mt-4'>
          <h2 className='text-md font-semibold border-b-[3px] border-cream2 bg-cream2 px-2'>
            Zone Description
          </h2>
          <p className='text-sm px-2 py-1'>
          Have you heard of Grimwood Forest? Have you heard of its countless tales, narrated by valiant adventurers who ventured forth? Its presence commands respect, and its shadowy, hushed demeanor breeds suspicion.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page;