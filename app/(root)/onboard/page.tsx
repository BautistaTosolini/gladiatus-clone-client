'use client'

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import axios from 'axios';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserContext } from '../layout'
import { BASE_API_URL } from '@/constants';

const Page = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [selected, setSelected] = useState<'male' | 'female' | null>(null);
  const [name, setName] = useState('');

  if (!user) {
    return router.push('/');
  }

  if (user.character.onboarded) {
    return router.push('/home');
  }

  const onClick = async () => {
    if (name.length < 3) {
      return toast.error('Your name should be at least 3 characters');
    }

    if (!selected) {
      return toast.error('Select a gender');
    }
    
    const payload = {
      gender: selected,
      name,
    }

    await axios.put(`${BASE_API_URL}/characters`, payload, { withCredentials: true })
      .then(() => {
        toast.success('Character created')
        router.push('/home');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
  }

  return (
    <div className='mt-16 mb-4 flex flex-col items-center gap-6 px-10'>
      <div className='flex flex-col items-center gap-4'>
        <h2 className='font-semibold text-lg red-card flex justify-center items-center text-cream2 h-10 px-4'>
            Gladiatus Clone
        </h2>
        <p className='orange-card p-2 text-crea2'>
        After a long and arduous journey, fleeing through foreign lands from a war that threatened your home, you manage to reach the domains of Balenos where an outpost halts you and attempts to ascertain your identity.
        </p>
      </div>
      <div className='flex flex-col gap-4 items-center'>
        <h2 className='font-semibold text-lg red-card flex justify-center items-center text-cream2 h-10 px-4'>
          How do you wish to be known in this domains
        </h2>
        <Input
          className='bg-cream p-2 rounded-sm w-[50%] border-none'
          placeholder='Enter your name...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='flex gap-4 flex-col'>
        <h2 className='font-semibold text-lg red-card flex justify-center items-center text-cream2 h-10 px-4'>
          Choose your gender
        </h2>
        <div className='flex flex-row gap-4'>
          <div>
            <Image 
              src={'/characters/male.jpg'}
              width={168}
              height={194}
              alt='male character'
              className={`${selected === 'female' && 'filter contrast-75 opacity-50'} cursor-pointer`}
              onClick={() => setSelected('male')}
            />
          </div>
          <div>
            <Image 
              src={'/characters/female.jpg'}
              width={168}
              height={194}
              alt='female character'
              className={`${selected === 'male' && 'filter contrast-75 opacity-50'} cursor-pointer`}
              onClick={() => setSelected('female')}
            />
          </div>
        </div>
        <div className='w-full flex justify-center'>
          <Button
            className='bg-red text-cream2 font-semibold hover:bg-red2 w-40'
            onClick={onClick}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page