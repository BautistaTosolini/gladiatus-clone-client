import * as z from 'zod';

export const RegisterSchema = z.object({
  name: z.string().nonempty({ message: 'Name cannot be empty' }).min(3, { message: 'Name should be at least 3 characters' }),
  email: z.string().nonempty({ message: 'E-Mail cannot be empty' }),
  password: z.string().nonempty({ message: 'Password cannot be empty' }).min(8, { message: 'Password should be at least 8 characters' }),
  confirmPassword: z.string().nonempty({ message: 'Password cannot be empty' }).min(8, { message: 'Password should be at least 8 characters' }),
});

export const LoginSchema = z.object({
  email: z.string().nonempty({ message: 'E-Mail cannot be empty' }),
  password: z.string().nonempty({ message: 'Password cannot be empty' }).min(8, { message: 'Password should be at least 8 characters' }),
});