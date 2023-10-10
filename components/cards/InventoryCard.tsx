import Image from 'next/image';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger } from '../ui/alert-dialog';

import DescriptionCard from './DescriptionCard';
import { ItemInterface } from '@/interfaces/item.interface';
import { Separator } from '../ui/separator';

interface DescriptionCardProps {
  inventory: ItemInterface[][];
  equipItem: (item: ItemInterface) => void;
}

const InventoryCard = ({ inventory, equipItem }: DescriptionCardProps) => {
  const typeMap = {
    mainHand: 'Main Hand',
    offHand: 'Off Hand',
    head: 'Head',
    chest: 'Chest',
    legs: 'Legs',
  };

  return (
    <DescriptionCard title='Inventory'>
      <div className="grid grid-cols-7 grid-rows-4 justify-center gap-x-1 gap-y-1">
        {inventory.map((row, rowIndex) => (
          row.map((item, itemIndex) => (
            <div key={itemIndex}>
              {item ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Image
                      className='cursor-pointer hover:brightness-125 rounded-sm'
                      src={`/items/${item.image}.jpg`}
                      width={38}
                      height={38}
                      alt={item.name}
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent className='p-0 border-0'>
                    <DescriptionCard title={item.name}>
                      <AlertDialogHeader className='flex flex-row w-full justify-between'>
                        <span className='text-base font-semibold text-brown2 flex flex-col'>
                          Level: {item.level}
                          <span className='text-sm text-brown2'>
                            {typeMap[item.type]}
                          </span>
                        </span>
                        <Image
                          className='rounded-sm'
                          src={`/items/${item.image}.jpg`}
                          width={40}
                          height={40}
                          alt={item.name}
                        />
                      </AlertDialogHeader>
                      <div>
                        {item.damage && item.damage.length > 0 &&
                          <div className='flex flex-row gap-2'>
                            <span className='font-semibold'>
                              Damage:
                            </span>
                            <span>
                              {item.damage[0]} - {item.damage[1]}
                            </span>
                          </div>
                        }
                        {item.armor &&
                          <div className='flex flex-row gap-2'>
                            <span className='font-semibold'>
                              Armor:
                            </span>
                            <span>
                              {item.armor}
                            </span>
                          </div>
                        }
                        <div className='flex flex-row gap-2'>
                          <span className='font-semibold'>
                            Power:
                          </span>
                          <span>
                            {item.power}
                          </span>
                        </div>
                        <div className='flex flex-row gap-2'>
                          <span className='font-semibold'>
                            Sell Price:
                          </span>
                          <span className='flex flex-row gap-1 items-center'>
                            {item.sellPrice}
                            <Image 
                              src={'/images/crowns.png'}
                              width={12}
                              height={12}
                              alt='crowns'
                            />
                          </span>
                        </div>
                      </div>
                      <div className='flex flex-row justify-end gap-4'>
                        <AlertDialogCancel className='fight-button h-9 font-semibold hover:brightness-110 hover:bg-brown hover:text-brown2 text-brown2'>
                          Return
                        </AlertDialogCancel>
                        <AlertDialogAction 
                          className='fight-button h-9 font-semibold hover:brightness-110 hover:bg-brown text-brown2'
                          onClick={() => equipItem(item)}
                        >
                          Equip
                        </AlertDialogAction>
                      </div>
                    </DescriptionCard>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Image 
                  className='rounded-sm'
                  src={`/items/empty.jpg`}
                  width={38}
                  height={38}
                  alt='empty'
                />
              )}
            </div>
          ))
        ))}
      </div>
    </DescriptionCard>
  )
}

export default InventoryCard