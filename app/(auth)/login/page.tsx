'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { BASE_API_URL } from '@/constants';

const Page = () => {
  const router = useRouter();
  const [submiting, setSubmiting] = useState(false);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setSubmiting(true);

    const { email, password } = data;

    const payload = {
      email,
      password,
    };
    
    await axios.post(`${BASE_API_URL}/api/users/session`, payload, { withCredentials: true })
      .then((response) => {
        router.push('/general/overview');
      })
      .catch((error) => {
        setSubmiting(false);
        toast.error(error.response.data.message);
      });
  };

  return (
    <Card className='w-[350px] rounded-sm cream-card'>
      <CardHeader>
        <CardTitle>Sing In</CardTitle>
        <CardDescription className='text-red'>Gladiatus Clone</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail</FormLabel>
                  <FormControl>
                    <Input
                      className='bg-cream border-none'
                      type='email'
                      placeholder='Enter your e-mail...' 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      className='bg-cream border-none'
                      type='password'
                      placeholder='Enter your password...' 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-center gap-4'>
              <Button
                className='w-40 bg-red text-cream2 font-semibold hover:bg-red2'
                onClick={() => router.push('/')}
              >
                Return
              </Button>
              <Button 
                type={submiting ? 'button' : 'submit'} 
                className={`w-40 ${submiting ? 'cursor-progress' : ''} bg-red text-cream2 font-semibold hover:bg-red2`}
              >
                {submiting ? 'Loading...' : 'Send'}
              </Button>
            </div>
            <span className='text-sm flex justify-center'>
              Don&apos;t have an account?
                <span 
                  className='text-red cursor-pointer mx-1'
                  onClick={() => router.push('/register')}
                >
                  Sign Up
                </span> 
              here.
            </span>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};

export default Page;