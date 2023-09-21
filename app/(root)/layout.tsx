'use client'

import axios from 'axios';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { BASE_API_URL } from '@/constants';
import LoadingPage from '@/components/shared/LoadingPage';
import Navbar from '@/components/shared/Navbar';
import NavigationBanner from '@/components/shared/NavigationBanner';

import { UserInterface } from '@/interfaces/user.interface';

const inter = Inter({ subsets: ['latin'] });

export const UserContext = createContext<UserInterface | null>(null);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    const authenticateUser = async () => {
      await axios.get(`${BASE_API_URL}/users`, { withCredentials: true })
        .then((response) => {
          const user = response.data;

          setUser(user);

          if (!user) {
            return router.push('/');
          }
        
          if (!user.character.onboarded) {
            setIsLoading(false);
            return router.push('/onboarding');
          }

          setIsLoading(false);
        })
        .catch(() => {
          router.push('/');
        })
    }

    authenticateUser();
  }, [router, pathname])

  if (isLoading || !user) {
    return <LoadingPage />
  }

  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='w-full flex justify-center min-h-screen background-main-image'>
          <Toaster
            toastOptions={{
              className: '',
              style: {
                background: '#eed7a1'
              }
            }}
          />
          <UserContext.Provider
            value={user}
          >
            <Navbar />
            <div className='w-full h-min-full flex flex-row justify-center gap-6'>
              <NavigationBanner />
              <div className='flex flex-col items-center h-min-full'>
                <div className='h-min-full main-cream-card w-[620px] flex-grow'>
                  {children}
                </div>
                <div className='footer w-[640px] h-[50px] orange-gradient' />
              </div>
            </div>
          </UserContext.Provider>
        </div>
      </body>
    </html>
  )
}
