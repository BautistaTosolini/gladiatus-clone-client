import Image from 'next/image';
import StatBar from '@/components/shared/StatBar';

function roundDownToNearestMultipleOf10(level: number): number {
  if (level > 80) return 80;

  const nearestMultipleOf10 = Math.floor(level / 10) * 10;
  return nearestMultipleOf10;
}


interface FighterCardProps {
  name: string;
  level: number;
  strength: number;
  endurance: number;
  dexterity: number;
  agility: number;
  intelligence: number;
  charisma: number;
  image: string;
  isEnemy?: boolean;
  zone?: string;
}

const FighterCard = ({ name, level, strength, endurance, dexterity, agility, intelligence, charisma, image, zone, isEnemy = false }: FighterCardProps) => {
  return (
    <div className='flex flex-col w-[185px] gap-3 items-center'>
       <h2 className='font-semibold text-lg red-card flex justify-center items-center text-cream2 h-10 px-4 w-full drop-shadow-xl'>
        {name}
      </h2>
      <Image 
        className='drop-shadow-xl'
        src={isEnemy ? `/enemies/${zone}/${image}.jpg` : `/characters/${image}/character-lvl${roundDownToNearestMultipleOf10(level)}.jpg`}
        width={180}
        height={207}
        alt='character'
      />
      <div className='orange-card w-full drop-shadow-xl'>
        <StatBar 
          name='Level'
          stat={level}
        />
        <StatBar 
          name='Strength'
          stat={strength}
        />
        <StatBar 
          name='Endurance'
          stat={endurance}
        />
        <StatBar 
          name='Agility'
          stat={agility}
        />
        <StatBar 
          name='Dexterity'
          stat={dexterity}
        />
        <StatBar 
          name='Intelligence'
          stat={intelligence}
        />
        <StatBar 
          name='Charisma'
          stat={charisma}
          last
        />
      </div>
    </div>
  )
}

export default FighterCard;