'use client';

import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

import { UserContext } from '@/app/(root)/layout';
import { BASE_API_URL } from '@/constants';
import DescriptionCard from '@/components/cards/DescriptionCard';
import LoadingPage from '@/components/shared/LoadingPage';

interface ArenaRival {
  name: string;
  _id: string;
  honour: number;
  rank: number;
}

const Page = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const character = user?.character;

  const [arenaRivals, setArenaRivals] = useState<ArenaRival[] | null>(null);

  useEffect(() => {
    const fetchArenaRivals = async () => {
      await axios.get(`${BASE_API_URL}/api/characters/arena`, { withCredentials: true })
        .then((response) => {
          const arenaRivals = response.data;

          setArenaRivals(arenaRivals);
        })
        .catch(() => {
          toast.error('Something wrong ocurred');
          router.push('/general/overview');
        })
    }

    fetchArenaRivals();
  }, [router])

  const onClick = async (id: string) => {
    await axios.post(`${BASE_API_URL}/api/characters/arena/${id}`, {}, { withCredentials: true })
      .then((response) => {
        const { battleReportId } = response.data;

        router.push(`/battle/${battleReportId}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
  }

  if (!arenaRivals) {
    return <LoadingPage />
  }

  if (!character) {
    return router.push('/general/overview');
  }

  return (
    <div className='w-full mt-16 px-8 gap-4 flex flex-col'>
      <div className='flex gap-4'>
        <Image 
          width={168}
          height={194}
          src={`/images/arena.jpg`}
          alt='barrakcs'
        />
        <DescriptionCard
          title='Arena'
        >
          <p>
            You smell fear and death as soon as you enter the arena. You know very well which legends were born before you, here, from the sand - and how they became dust again.
          </p>
          <p>
            You can prove yourself as a gladiator in the arena.
          </p>
        </DescriptionCard>
      </div>
      <h1 className='text-xl font-bold border-b-[3px] border-brown2 text-center text-brown2'>
        League of Balenos
      </h1>
      <div className='flex gap-4'>
        <DescriptionCard
          title='Arena Ranking'
        >
          <div className='flex flex-col w-full justify-between'>
            <div className='flex w-full gap-2 font-semibold'>
              <div className='min-w-[50px]'>
                Rank
              </div>
              <div className='min-w-[50px]'>
                Honour
              </div>
              <div className='w-[200px]'>
                Name
              </div>
            </div>
            {arenaRivals.map((rival) => (
              <div 
                className='flex flex-col w-full justify-between'
                key={rival._id}
              >
                <div className='flex w-full gap-2'>
                <div className='min-w-[50px] font-semibold'>
                    {rival.rank}
                  </div>
                  <div className='min-w-[50px] font-semibold'>
                    {rival.honour}
                  </div>
                  <div
                    className={`w-[130px] ${rival._id !== character._id && 'font-semibold underline cursor-pointer'}`}
                    onClick={rival._id !== character._id ? () => router.push(`/character/${rival._id}`) : () => {}}
                  >
                    {rival.name}
                  </div>
                  {rival._id !== character._id &&
                    <div className='cursor-pointer'>
                      <Image 
                        src={`/images/fight.png`}
                        width={55}
                        height={22}
                        alt='fight'
                        key={`${rival._id}-${rival.name}`}
                        onClick={() => onClick(rival._id)}
                      />
                    </div> 
                  }
                </div>
              </div>
            ))}
          </div>
        </DescriptionCard>
      </div>
    </div>
  )
}

export default Page