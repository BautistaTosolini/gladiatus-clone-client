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
      await axios.get(`${BASE_API_URL}/api/characters/enemy?zone=grimwood`, { withCredentials: true })
        .then((response) => {
          const enemies = response.data;

          setEnemies(enemies);
        })
        .catch(() => {
          router.push('/general/overview')
        });
    }

    fetchEnemies();
  }, [router])

  if (!enemies) {
    return <LoadingPage />
  }

  return (
    <div className='w-full mt-16 px-4 flex flex-col gap-4'>
      <h1 className='text-xl font-bold border-b-[3px] border-brown2 text-center text-brown2'>
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
      <div>
        <DescriptionCard
          title='Zone description'
        >
          Grimwood is a place where magic and nature coexist in perfect harmony, though it also conceals dark secrets and mythical creatures lurking in the shadows of the dense forest. The atmosphere of the area is imbued with a melancholic and mysterious ambiance that beckons exploration and the discovery of the mysteries lying beneath its lush vegetation.
        </DescriptionCard>
      </div>
    </div>
  )
}

export default Page;