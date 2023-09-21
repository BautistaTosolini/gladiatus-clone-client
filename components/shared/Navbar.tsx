import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className='bg-red fixed w-full h-12 flex flex-row items-center px-14 justify-between drop-shadow-2xl border-b-[3px] border-cream2 red-nav z-[999]'>
      <h2 
        className='text-lg font-semibold text-cream2 cursor-pointer hidden sm:flex'
        onClick={() => router.push('/overview')}
      >
        Gladiatus Clone
      </h2>
    </nav>
  )
}

export default Navbar