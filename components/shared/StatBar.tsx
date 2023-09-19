interface StatBarProps {
  name: string;
  stat: number;
  nextLevel?: number;
  last?: boolean;
}

const StatBar = ({ name, stat, nextLevel, last }: StatBarProps) => {
  if (nextLevel) {
    const nextLevelExperience = (10 * (nextLevel + 1 ) - 5) - 10

    return (
      <div className={`${!last && 'border-b-[3px]'} border-cream2 px-2`}>
        <div className='flex justify-between text-sm'>
          {name}:
          <span>
            {stat}/{nextLevelExperience}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`${!last && 'border-b-[3px]'} border-cream2 px-2`}>
      <div className='flex justify-between text-sm'>
        {name}:
        <span>
          {stat}
        </span>
      </div>
    </div>
  )
}

export default StatBar