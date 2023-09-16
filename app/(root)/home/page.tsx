'use client'

import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../layout';
import LoadingPage from '@/components/shared/LoadingPage';
import { redirect, useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  if (!user) {
    return router.push('/');
  }

  if (!user.character.onboarded) {
    return router.push('/onboard');
  }

  return (
    <>
      {user.name}
    </>
  )
}

export default Page