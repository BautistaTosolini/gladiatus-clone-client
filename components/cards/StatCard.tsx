import Image from 'next/image';
import toast from 'react-hot-toast';

interface StatCardProps {
  statName: string;
  statValue: number;
  crowns: number;
  onClick: () => void;
  last?: boolean;
  characterCrowns: number,
}

const StatCard = ({ statName, statValue, crowns, onClick, characterCrowns, last = false }: StatCardProps) => {
  const canTrain = characterCrowns > crowns;

  return (
    <div className={`flex justify-between px-2 py-1 items-center text-brown2 ${!last && 'border-b-[3px] border-cream2'}`}>
      <div className='flex justify-between w-32'>
        {statName}: <span className='font-semibold text-red3'>{statValue}</span>
      </div>
      <div className='flex justify-between text-sm font-semibold items-center'>
        <div className='flex items-center gap-1'>
          {crowns}
          <Image 
            src={'/images/crowns.png'}
            width={12}
            height={12}
            alt='crowns'
          />
        </div>
        <div 
          className={`${canTrain ? 'cursor-pointer hover:brightness-110 ml-2' : ''}`}
          onClick={!canTrain ? () => {} : onClick}
        >
          <Image
            src={`${canTrain ? '/images/train.jpg' : '/images/cant-train.jpg'}`}
            width={25}
            height={25}
            alt='train'
          />
        </div>
      </div>
    </div>
  )
};

export default StatCard;