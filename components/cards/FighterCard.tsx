import Image from 'next/image';

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
  power: number;
}

const FighterCard = ({ name, level, strength, endurance, dexterity, agility, intelligence, charisma, power, image, zone, isEnemy = false }: FighterCardProps) => {
  return (
    <div className='flex flex-col w-[168px] gap-3 items-center'>
      <h2 className='font-semibold text-md red-card flex justify-center items-center text-cream2 h-10 px-4 w-full drop-shadow-xl'>
        {name}
      </h2>
      <Image 
        className='drop-shadow-xl'
        src={isEnemy ? `/enemies/${zone}/${image}.jpg` : `/characters/${image}/character-lvl${roundDownToNearestMultipleOf10(level)}.jpg`}
        width={168}
        height={194}
        alt='character'
      />
      <div className='brown-card w-full drop-shadow-xl rounded-sm text-brown2'>

        <div className='border-cream2 px-2 border-b-[2px]'>
          <div className='flex justify-between text-sm'>
            Level:
            <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
              {level}
            </span>
          </div>
        </div>

        <div className='border-cream2 px-2 border-b-[2px]'>
          <div className='flex justify-between text-sm'>
            Strenght:
            <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
              {strength}
            </span>
          </div>
        </div>

        <div className='border-cream2 px-2 border-b-[2px]'>
          <div className='flex justify-between text-sm'>
            Endurance:
            <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
              {endurance}
            </span>
          </div>
        </div>

      <div className='border-cream2 px-2 border-b-[2px]'>
          <div className='flex justify-between text-sm'>
            Agility:
            <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
              {agility}
            </span>
          </div>
        </div>

        <div className='border-cream2 px-2 border-b-[2px]'>
          <div className='flex justify-between text-sm'>
            Dexterity:
            <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
              {dexterity}
            </span>
          </div>
        </div>

        <div className='border-cream2 px-2 border-b-[2px]'>
          <div className='flex justify-between text-sm'>
            Intelligence:
            <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
              {intelligence}
            </span>
          </div>
        </div>

        <div className='border-cream2 px-2 border-b-[2px]'>
          <div className='flex justify-between text-sm'>
            Charisma:
            <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
              {charisma}
            </span>
          </div>
        </div>

        <div className='border-cream2 px-2'>
          <div className='flex justify-between text-sm'>
            Total Power:
            <span className='flex justify-center items-center font-semibold gap-2 text-red3'>
              {power}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FighterCard;