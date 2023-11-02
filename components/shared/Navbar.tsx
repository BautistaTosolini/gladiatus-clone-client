import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';
import { BASE_API_URL } from '@/constants';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
  const router = useRouter();

  const logOut = async () => {
    await axios.put(`${BASE_API_URL}/api/users`, {}, { withCredentials: true })
      .then((res) => {
        toast.success('Logged out successfully');
        router.push('/login');
      })
  }

  return (
    <nav className='bg-red fixed w-full h-12 flex flex-row items-center px-14 justify-between drop-shadow-2xl border-b-[3px] border-cream2 red-nav z-[998]'>
      <h2 
        className='text-lg font-semibold text-cream2 cursor-pointer hidden sm:flex'
        onClick={() => router.push('/general/overview')}
      >
        Gladiatus Clone
      </h2>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='red-card text-cream2 text-center font-semibold text-md cursor-pointer hover:text-gold hover:border-gold transition rounded-sm hover:bg-red h-8 w-40'>
          My Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 red-card'>
        <DropdownMenuLabel className='text-cream2'>
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-cream2' />
        <DropdownMenuGroup>
          <DropdownMenuItem className='hover:bg-red2 cursor-pointer'>
            <User className='mr-2 h-4 w-4 text-cream2' />
            <span className='text-cream2'>
              Profile
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className='hover:bg-red2 cursor-pointer'>
            <Settings className='mr-2 h-4 w-4 text-cream2' />
            <span className='text-cream2'>
              Settings
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='bg-cream2' />
        <DropdownMenuItem 
          className='hover:bg-red2 cursor-pointer'
          onClick={logOut}
        >
          <LogOut className='mr-2 h-4 w-4 text-cream2' />
          <span className='text-cream2'>
            Log out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </nav>
  )
}

export default Navbar