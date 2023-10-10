import { ItemInterface } from '@/interfaces/item.interface';
import Image from 'next/image';
import EquippedItem from '../shared/EquippedItem';

interface EquipmentCardProps {
  head: ItemInterface | null;
  chest: ItemInterface | null;
  legs: ItemInterface | null;
  mainHand: ItemInterface | null;
  offHand: ItemInterface | null;
  unequipItem: (type: string) => void;
}

const EquipmentCard = ({ head, chest, legs, mainHand, offHand, unequipItem }: EquipmentCardProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='brown-card w-full flex flex-col py-1 px-2 gap-4'>
        <span className='font-semibold text-brown2'>
          Equipment
        </span>
        <div className='px-2 flex flex-col gap-2'>
          <div className='w-full flex justify-center'>
            <EquippedItem
              item={head}
              unequipItem={unequipItem}
            />
          </div>
          <div className='w-full flex justify-between'>
            <EquippedItem
              item={mainHand}
              unequipItem={unequipItem}
            />
            <EquippedItem
              item={chest}
              unequipItem={unequipItem}
            />
            <EquippedItem
              item={offHand}
              unequipItem={unequipItem}
            />
          </div>
          <div className='w-full flex justify-center'>
            <EquippedItem
              item={legs}
              unequipItem={unequipItem}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EquipmentCard