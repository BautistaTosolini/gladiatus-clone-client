import Image from "next/image";
import toast from "react-hot-toast";

interface StatCardProps {
  statName: string;
  statValue: number;
  crowns: number;
  onClick: () => void;
  last?: boolean;
  characterCrowns: number,
}

const StatCard = ({ statName, statValue, crowns, onClick, characterCrowns, last = false }: StatCardProps) => (
  <div className={`flex justify-between px-2 py-1 items-center ${!last && 'border-b-[3px] border-cream2'}`}>
    <div className='flex justify-between w-32'>
      {statName}: <span className='font-semibold'>{statValue}</span>
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
        className={`bg-gold border-[2px] border-cream text-[20px] w-6 h-6 flex items-center ml-2 justify-center text-[#003805] font-bold cursor-pointer hover:brightness-110 ${characterCrowns < crowns && 'brightness-50 hover:brightness-50 cursor-default'}`}
        onClick={characterCrowns < crowns ? () => toast.error('Not enough crowns') : onClick}
      >
        +
      </div>
    </div>
  </div>
);

export default StatCard;