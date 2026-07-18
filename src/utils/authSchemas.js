import { z } from 'zod'

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters.')
  .regex(/[A-Z]/, 'Include at least one uppercase letter.')
  .regex(/[a-z]/, 'Include at least one lowercase letter.')
  .regex(/[0-9]/, 'Include at least one number.')

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(1, 'Enter your password.'),
  remember: z.boolean().default(true),
})

export const registerSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.').max(80, 'Name must be 80 characters or fewer.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().regex(/^\+?[0-9]{10,15}$/, 'Enter a valid phone number with 10 to 15 digits.'),
  password: passwordSchema,
  confirmPassword: z.string(),
  acceptTerms: z.literal(true, { error: 'You must accept the terms and privacy policy.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
})

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
})

export const profileSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.').max(80, 'Name must be 80 characters or fewer.'),
  phone: z.string().trim().regex(/^\+?[0-9]{10,15}$/, 'Enter a valid phone number with 10 to 15 digits.'),
})
