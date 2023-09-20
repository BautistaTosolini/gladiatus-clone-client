import Image from 'next/image';
import StatBar from '@/components/shared/StatBar';
import { CharacterInterface } from '@/interfaces/character.interface';

function roundDownToNearestMultipleOf10(level: number): number {
  if (level > 80) return 80;

  const nearestMultipleOf10 = Math.floor(level / 10) * 10;
  return nearestMultipleOf10;
}

const CharacterCard = ({ character }: { character: CharacterInterface }) => {
  return (
    <div className='flex flex-col w-[185px] gap-3 items-center'>
      <h2 className='font-semibold text-lg red-card flex justify-center items-center text-cream2 h-10 px-4 w-full drop-shadow-xl'>
        {character.name}
      </h2>
      <Image 
        className='drop-shadow-xl'
        src={`/characters/${character.gender}/character-lvl${roundDownToNearestMultipleOf10(character.level)}.jpg`}
        width={180}
        height={207.86}
        alt='character'
      />
      <div className='orange-card w-full drop-shadow-xl'>
        <StatBar
          name='Crowns'
          stat={character.crowns}
        />
        <StatBar 
          name='Level'
          stat={character.level}
        />
        <StatBar 
          name='Experience'
          stat={character.experience}
          nextLevel={character.level}
        />
        <StatBar 
          name='Strength'
          stat={character.strength}
        />
        <StatBar 
          name='Endurance'
          stat={character.endurance}
        />
        <StatBar 
          name='Agility'
          stat={character.agility}
        />
        <StatBar 
          name='Dexterity'
          stat={character.dexterity}
        />
        <StatBar 
          name='Intelligence'
          stat={character.intelligence}
        />
        <StatBar 
          name='Charisma'
          stat={character.charisma}
          last
        />
      </div>
    </div>
  )
}

export default CharacterCard