import { usePathname, useRouter } from 'next/navigation';

const NavigationBanner = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isOnboard = pathname === '/onboarding';

  const villageRoutes = [
    {
      name: 'Overview',
      link: '/overview',
    },
    {
      name: 'Barracks',
      link: '/barracks',
    },
    {
      name: 'Highscore',
      link: '/highscore',
    },
  ]

  const surroundingsRoutes = [
    {
      name: 'Grimwood Forest',
      link: '/grimwood',
    },
    {
      name: 'Bandit Settlement',
      link: '/bandit',
    },
    {
      name: 'Ancient Crypt',
      link: '/crypt',
    }
  ]

  return (
    <div className={`min-h-full w-[200px] main-red-card pt-14 flex flex-col gap-2 px-1 ${isOnboard && 'hidden'}`}>
      <h2 className='border-b-cream2 border-b-[3px] text-center font-semibold text-cream2 text-lg'>
        General
      </h2>
      {villageRoutes.map((route) => {
        const isActive = (pathname.includes(route.link) && route.link.length > 1) || (pathname === route.link);

        return (
          <div 
            className={`red-card text-cream2 text-center font-semibold text-md cursor-pointer hover:text-gold hover:border-gold transition rounded-sm ${isActive && 'nav-banner-active'}`}
            key={route.name}
            onClick={() => router.push(route.link)}
          >
            {route.name}
          </div>
        )
      })}
      <h2 className='border-b-cream2 border-b-[3px] text-center font-semibold text-cream2 text-lg'>
        World
      </h2>
      {surroundingsRoutes.map((route) => {
        const isActive = (pathname.includes(route.link) && route.link.length > 1) || (pathname === route.link);

        return (
          <div 
            className={`red-card text-cream2 text-center font-semibold text-md cursor-pointer hover:text-gold hover:border-gold transition rounded-sm ${isActive && 'nav-banner-active'}`}
            key={route.name}
            onClick={() => router.push(route.link)}
          >
            {route.name}
          </div>
        )
      })}
    </div>
  )
}

export default NavigationBanner