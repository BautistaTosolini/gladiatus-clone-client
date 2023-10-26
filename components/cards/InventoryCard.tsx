import Image from 'next/image';

import DescriptionCard from './DescriptionCard';
import { ItemInterface } from '@/interfaces/item.interface';
import Modal from '../shared/Modal';
import { useState } from 'react';

interface DescriptionCardProps {
  inventory: ItemInterface[][];
  equipItem: (item: ItemInterface) => void;
}

const InventoryCard = ({ inventory, equipItem }: DescriptionCardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
                <>
                  <Image
                    onClick={openModal}
                    className='cursor-pointer hover:brightness-125 rounded-sm'
                    src={`/items/${item.image}.jpg`}
                    width={38}
                    height={38}
                    alt={item.name}
                  />
                  <Modal 
                    isOpen={isModalOpen} 
                    onClose={closeModal}
                    title={item.name}
                    nextFunction={() => equipItem(item)}
                    nextButtonText='Equip'
                  >
                    <div className='px-2 flex flex-col gap-2'>
                      <div className='flex justify-between'>
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
                      </div>
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
                      </div>
                    </div>
                  </Modal>
                </>
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