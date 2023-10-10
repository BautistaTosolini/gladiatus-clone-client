'use client'

import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { UserContext } from '../../layout';
import CharacterCard from '@/components/cards/CharacterCard';
import { BASE_API_URL } from '@/constants';
import { ItemInterface } from '@/interfaces/item.interface';
import EquipmentCard from '@/components/cards/EquipmentCard';
import InventoryCard from '@/components/cards/InventoryCard';

const Page = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const character = user?.character;

  if (!user || !character) {
    router.push('/');
    return null;
  }

  const equipItem = async (item: ItemInterface) => {
    await axios.put(`${BASE_API_URL}/api/items/equipment`, { item }, { withCredentials: true })
      .then((response) => {
        const updatedCharacter = response.data;
        
        character.inventory = updatedCharacter.inventory;
        character[item.type] = item;
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }

  const unequipItem = async (type: string) => {
    type EquipmentType = 'mainHand' | 'offHand' | 'head' | 'chest' | 'legs';

    await axios.delete(`${BASE_API_URL}/api/items/equipment/${type}`, { withCredentials: true })
      .then((response) => {
        const updatedCharacter = response.data;
        
        character.inventory = updatedCharacter.inventory;
        character[type as EquipmentType] = updatedCharacter[type];
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }

  return (
    <div className='w-full mt-16 mb-4 px-12 flex flex-row justify-between gap-8'>

      <CharacterCard
        character={character}
      />

      <div className='flex flex-col gap-4'>
        <EquipmentCard
          head={character.head ? character.head : null}
          chest={character.chest ? character.chest : null}
          legs={character.legs ? character.legs : null}
          mainHand={character.mainHand ? character.mainHand : null}
          offHand={character.offHand ? character.offHand : null}
          unequipItem={unequipItem}
        />

        <InventoryCard 
          inventory={character.inventory}
          equipItem={equipItem}
        />
      </div>
    </div>
  )
}

export default Page